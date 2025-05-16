import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { groq } from "../utils/groqai";
import Error from "./Error";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) {
      alert("Type something you'd like to watch");
      return;
    }

    try {
      const groqResults = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a movie recommendation system.BOth Bollywood and Hollywood. Suggest  movies based on the keyword or mood.First try finding the keyword matches",
          },
          {
            role: "user",
            content: `Suggest  movies based on the keyword or mood and response should have only names separated with commas: ${searchText.current.value}`,
          },
        ],
      });

      if (!groqResults.choices){
        return <Error/>
      }
      
      const groqMovies = groqResults?.choices[0]?.message?.content.split(",");
      console.log(groqMovies);
      const promiseArray = groqMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: groqMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching GroqAI response:", error);
      alert("An error occurred while fetching movie suggestions.");
    }
  };

  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className="w-1/2  grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 outline-none text-lg rounded-l-md col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 py-2 text-lg px-4 bg-red-700 text-white rounded-r-md"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
