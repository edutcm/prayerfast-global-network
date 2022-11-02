// import libs
import React from "react";
import { PageContextProps } from "../../gatsby/data-props";

// import providers
import { CookiesProvider } from "react-cookie";
import { AppProvider } from "../../services/app";

// import components
import Navigation from "../navigation";
import LanguageSwitcher from "../language-switcher";
import { MobileMenu } from "../navigation/mobile";
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
        <div className="font-montserrat">
          <Navigation pageContext={pageContext} locales={locales} />
          <Main>{children}</Main>
        </div>
        <LanguageSwitcher pageContext={pageContext} locales={locales} />
        <MobileMenu pageContext={pageContext} locales={locales} />
      </AppProvider>
    </CookiesProvider>
  );
};

export default Layout;
