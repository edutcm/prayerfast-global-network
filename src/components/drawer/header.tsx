// import libs
import React, { Dispatch, SetStateAction } from "react";

import { TiChevronLeft } from "react-icons/ti";

export interface IHeaderProps {
  title: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  backButton: string;
}

export const Header = ({ title, setIsOpen, backButton }: IHeaderProps) => {
  return (
    <header className="standalone:pt-12 px-5 py-5 bg-emerald-600 text-white flex flex-row justify-between items-center">
      <div className="w-3/12">
        <button
          className="flex flex-row items-center text-white hover:text-emerald-100"
          onClick={() => setIsOpen(false)}
        >
          <TiChevronLeft />
          <span className="text-xs">{backButton}</span>
        </button>
      </div>
      <div className="w-9/12 flex justify-end">
        <h2 className="text-base">{title}</h2>
      </div>
    </header>
  );
};
