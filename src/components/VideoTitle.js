import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-md w-1/3">{overview}</p>

      <div>
        <button className="bg-white text-black p-2 px-8 rounded-md text-md hover:opacity-80">
          ▶︎ Play
        </button>
        <button className="bg-[#5d5d5df4] mx-4 text-white p-2 rounded-md px-8 text-md hover:opacity-80">
          <span className="text-lg">🛈</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
