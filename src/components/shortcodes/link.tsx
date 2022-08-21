// import libs
import React from "react";
import { getLocalizedPath } from "../../services/locales";

// import components
import { Link as GatsbyLink } from "gatsby";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  to: string;
  locale: string;
}

export const Link = ({ children, className = "", to, locale }: LinkProps) => {
  const localizedTo = getLocalizedPath(to, locale);

  return (
    <div className="py-5">
      <GatsbyLink
        to={localizedTo}
        className={`bg-emerald-500 hover:bg-emerald-400 p-3 rounded-md md:mb-3 lg:mb-0 lg:mr-3 ${className}`}
      >
        {children}
      </GatsbyLink>
    </div>
  );
};
