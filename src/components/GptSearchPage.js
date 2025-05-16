import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { BG_URL } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div >
      <div className="fixed -z-10 ">
        <img
          src={BG_URL}
          alt="Login Background Image"
          className="min-h-screen min-w-screen object-cover"
        />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  );
};

export default GptSearchPage;
