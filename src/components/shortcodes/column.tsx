// import libs
import React from "react";

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  span?: number;
}

export const Column = ({ children, className = "", span }: ColumnProps) => {
  let colSpan = "col-auto";
  if (span !== undefined) {
    colSpan = `col-span-${span}`;
  }

  return <div className={`${className} ${colSpan}`}>{children}</div>;
};
