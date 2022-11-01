// import libs
import React from "react";

// import components
import { Link } from "gatsby";

const Error = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-gray-500 text-[4rem]">404</h1>
        <p>
          <Link
            to="/"
            className="text-sm text-white bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-md"
          >
            Go to the homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
