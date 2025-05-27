import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] md:pt-[20%] px-4 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-md w-1/3">{overview}</p>

      <div className="mt-1" >
        <button className="bg-white text-black py-1 md:py-2 px-4 md:px-8 rounded-md text-md hover:opacity-80">
          ▶︎ Play
        </button>
        <button className="bg-[#5d5d5df4] py-1 mx-2 md:mx-4 text-white md:py-2 rounded-md px-4  md:px-8 text-md hover:opacity-80">
          <span className="text-lg">🛈</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
