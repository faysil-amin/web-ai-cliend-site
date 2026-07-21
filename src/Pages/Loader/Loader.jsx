import React from "react";

const Loader = ({ brandName = "WEB AI" }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Gradient Ring */}
        <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400 p-1 shadow-lg shadow-red-500/20">
          {/* Inner Circle to create ring effect */}
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>

        {/* Center Pulse Dot */}
        <div className="absolute w-4 h-4 bg-gradient-to-tr from-red-500 to-amber-500 rounded-full animate-ping"></div>
      </div>

      {/* Website Name with Blinking Effect */}
      <div className="mt-5 text-center">
        <h2 className="text-base font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 uppercase animate-pulse">
          {brandName}
        </h2>
        <span className="text-xs text-gray-400 font-medium tracking-widest animate-pulse">
          Please wait...
        </span>
      </div>
    </div>
  );
};

export default Loader;