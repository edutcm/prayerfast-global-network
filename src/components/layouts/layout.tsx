// import libs
import React from "react";
import { PageContextProps } from "../../gatsby/data-props";

// import providers
import { CookiesProvider } from "react-cookie";
import { AppProvider } from "../../services/app";

// import components
import Navigation from "../navigation";
import LanguageSwitcher from "../language-switcher";
import Main from "../main";

interface LayoutProps {
  children: React.ReactNode;
  pageContext: PageContextProps;
  data: any;
}

const Layout = ({ children, pageContext, data }: LayoutProps) => {
  const { locales, page } = data;

  return (
    <CookiesProvider>
      <AppProvider locale={page.fields.locale}>
        <div className="flex flex-col-reverse md:flex-row md:rtl:flex-row-reverse bg-gray-900 font-montserrat">
          <Main>{children}</Main>
          <div className="w-screen md:w-[100px] h-[90px] md:h-screen">
            <Navigation pageContext={pageContext} locales={locales} />
          </div>
        </div>
        <LanguageSwitcher pageContext={pageContext} locales={locales} />
      </AppProvider>
    </CookiesProvider>
  );
};

export default Layout;
