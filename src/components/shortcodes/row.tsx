// import libs
import React from "react";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  cols: number;
}

export const Row = ({ children, className = "", cols }: RowProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} ${className}`}>
      {children}
    </div>
  );
};
