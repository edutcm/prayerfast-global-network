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
    <div className="bg-slate-800 h-screen">
      <main className="h-screen overflow-y-scroll no-scrollbar">
        {/* @ts-expect-error */}
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>
      {!appCookies && (
        <CookieConsent cookieName="gatsby-gdpr-google-analytics" />
      )}
    </div>
  );
};

export default Main;
