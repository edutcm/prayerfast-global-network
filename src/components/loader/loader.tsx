// import libs
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-800">
      <div>
        <div
          style={{
            borderTopColor: "transparent",
          }}
          className="w-16 h-16 border-4 border-emerald-500 border-solid rounded-full animate-spin"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
