// import libs
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  to: string;
}

export const Button = ({ children, className = "", to }: ButtonProps) => {
  return (
    <div className="py-5">
      <a
        href={to}
        target="_blank"
        className={`bg-emerald-500 hover:bg-emerald-400 p-3 rounded-md md:mb-3 lg:mb-0 lg:mr-3 ${className}`}
      >
        {children}
      </a>
    </div>
  );
};
