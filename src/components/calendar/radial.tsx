// import libs
import React from "react";

export interface RadialProps {
  percentage: number;
}

export const Radial = ({ percentage }: RadialProps) => {
  return (
    <div className="relative h-[1.25rem] w-[1.25rem] leading-5 mt-[-2px]">
      <div
        className="radial-progress z-20 text-emerald-300 leading-5"
        style={{
          // @ts-expect-error
          "--value": percentage > 97 ? 97 : percentage,
          "--size": "1.25rem",
          "--thickness": "2px",
        }}
      />
      <div
        className={`top-[1px] left-0 absolute flex justify-center items-center w-[1.25rem] h-[1.25rem] rounded-full border-[2px] z-10 border-emerald-600/50`}
      />
    </div>
  );
};
