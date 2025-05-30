import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  return (
    <div className="px-2 md:px-12">
      <h1 className="text-md md:text-xl py-1 md:py-4 text-white">{title}</h1>
      <div className=" flex overflow-x-scroll movie-scroll-container ">
        <div className="flex cursor-pointer">

          {movies && movies.map((movie) => (
                <MovieCard posterPath={movie.poster_path} key={movie.id}/>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
