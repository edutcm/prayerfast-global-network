// import libs
import React from "react";
import { PageContextProps } from "../../gatsby/data-props";

// import providers
import { CookiesProvider } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";

// import components
import Seo from "../seo";
import Navigation from "../navigation";
import LanguageSwitcher from "../language-switcher";
import Main from "../main";

interface LayoutProps {
  children: React.ReactNode;
  pageContext: PageContextProps;
  data: any;
}

const Layout = ({ children, pageContext, data }: LayoutProps) => {
  const { locales } = data;

  return (
    <CookiesProvider>
      {/* <HelmetProvider> */}
      {/* <Seo
          siteName={locales.frontmatter.siteName}
          pageContext={pageContext}
        /> */}
      <div className="flex flex-col md:flex-row md:rtl:flex-row-reverse bg-slate-900 font-montserrat">
        <Main>{children}</Main>
        <div className="w-screen md:w-[100px] h-[90px] md:h-screen">
          <Navigation pageContext={pageContext} locales={locales} />
        </div>
      </div>
      <LanguageSwitcher pageContext={pageContext} locales={locales} />
      {/* </HelmetProvider> */}
    </CookiesProvider>
  );
};

export default Layout;
