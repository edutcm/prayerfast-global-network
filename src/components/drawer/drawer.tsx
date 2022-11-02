// import libs
import React, { Dispatch, SetStateAction } from "react";
import { useSwipeable } from "react-swipeable";

// import components
import { Header } from "./header";

export interface IDrawerProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locales: any;
}

export const Drawer = ({
  title,
  children,
  isOpen,
  setIsOpen,
  locales,
}: IDrawerProps) => {
  const handlers = useSwipeable({
    onSwipedRight: () => {
      setIsOpen(false);
    },
  });

  return (
    <div
      {...handlers}
      className={
        "fixed overflow-hidden z-[10000] inset-0 transform " +
        (isOpen
          ? "transition-all duration-200 ease-out-in translate-x-0"
          : "transition-all duration-300 delay-300 ease-in-out translate-x-[100%]")
      }
    >
      <div className="flex flex-row h-screen">
        <div
          className={
            "grow h-full min-w-max cursor-pointer bg-black/60 " +
            (isOpen
              ? "transition-opacity duration-200 opacity-100"
              : "transition-opacity duration-75 opacity-0")
          }
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <div
          className={
            "w-screen max-w-xs left-0 bg-gray-900/80 backdrop-blur-md h-full overflow-y-scroll transition-all transform flex flex-col justify-start " +
            (isOpen ? "translate-x-0" : "translate-x-[100%]")
          }
        >
          <Header
            title={title}
            setIsOpen={setIsOpen}
            backButton={locales.frontmatter.misc.close}
          />
          <div className="pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
