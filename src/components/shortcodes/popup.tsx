// import libs
import React from "react";

interface PopupProps {
  children: React.ReactNode;
  text: string;
  color: string;
}

export const Popup = ({
  children,
  text,
  color = "text-emerald-200 hover:text-emerald-100",
}: PopupProps) => {
  return (
    <div className={`${color} inline-block md:relative cursor-pointer group`}>
      {children}
      <div className="absolute z-[9000] text-white text-left bg-gray-900/95 p-3 text-sm rounded-md cursor-default hidden group-hover:block md:min-w-[400px] md:max-w-[600px] left-5 right-5 md:left-0 md:right-0">
        {text}
      </div>
    </div>
  );
};
