// import libs
import React, { useContext } from "react";
import { bgs } from "../../utils/theme";

// import components
import { AppContext } from "../../services/app";

interface CalloutProps {
  children: React.ReactNode;
  background: string;
  color: string;
  className?: string;
}

export const Callout = ({
  children,
  background = "primary",
  color = "text-white",
  className = "",
}: CalloutProps) => {
  const { appCookies } = useContext(AppContext);

  return (
    <div
      className={`flex justify-start items-center flex-col rtl:items-start box-border py-10 ${
        !appCookies ? "md:h-[calc(50vh-30px)]" : "md:min-h-[50vh]"
      } ${bgs[background as keyof typeof bgs]} ${color} ${className}`}
    >
      <div className="w-4/5 mx-auto my-auto md:w-[70%]">{children}</div>
    </div>
  );
};
