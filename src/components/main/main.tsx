// import libs
import React, { useContext } from "react";

// import providers
import { MDXProvider } from "@mdx-js/react";

// import components
import { AppContext } from "../../services/app";
import * as shortcodes from "../shortcodes";
import CookieConsent from "../cookie-consent";

// mdx components
const components = Object.assign(
  {},
  {
    h2: shortcodes.H2,
    p: shortcodes.P,
    ul: shortcodes.UL,
    li: shortcodes.LI,
  },
  shortcodes
);

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  const { appCookies } = useContext(AppContext);

  return (
    <div className="w-screen md:w-[calc(100vw-100px)] h-[calc(100vh-90px)] md:h-screen overflow-y-scroll bg-slate-800 box-border flex flex-col">
      <main
        className={`${
          !appCookies ? "h-[calc(100vh-60px)]" : "h-full"
        } overflow-y-scroll`}
      >
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>
      {!appCookies && (
        <CookieConsent cookieName="gatsby-gdpr-google-analytics" />
      )}
    </div>
  );
};

export default Main;
