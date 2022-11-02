// import libs
import React from "react";
import { PageContextProps } from "../../gatsby/data-props";
import { locales as langs, getLocalizedPath } from "../../services/locales";
import { navigate } from "gatsby";
import { useAppContext } from "../../services/app";

// import components
import { Drawer } from "../drawer";
import { AiOutlineCloseCircle } from "react-icons/ai";

// props
interface LanguageSelectorProps {
  pageContext: PageContextProps;
  locales: any;
}

// language selector component
const LanguageSelector = ({ pageContext, locales }: LanguageSelectorProps) => {
  if (langs.length <= 1) return null;

  const { switcher, toggleSwitcher } = useAppContext();

  const changeLocale = (locale: string) => {
    const navigateTo = getLocalizedPath(pageContext.navSlug, locale);
    navigate(navigateTo);
    if (toggleSwitcher) {
      toggleSwitcher(!switcher);
    }
  };

  return (
    <Drawer
      title={locales.frontmatter.misc.chooseLanguage}
      isOpen={switcher}
      setIsOpen={toggleSwitcher}
      locales={locales}
    >
      <div className="grid grid-cols-1 gap-3 p-7">
        {langs.map((locale) => {
          const active = pageContext.locale === locale.key;

          return (
            <div
              key={locale.key}
              className={`group grid grid-cols-7 justify-end items-center cursor-pointer`}
              onClick={() => changeLocale(locale.key)}
            >
              <span
                className={`${
                  active
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-800 text-gray-200"
                } col-span-2 group-hover:bg-emerald-500 group-hover:text-white px-3 py-2 text-sm rounded-l-md rtl:rounded-r-md rtl:rounded-l-none text-center`}
              >
                {locale.key}
              </span>
              <span
                className={`${
                  active ? "text-white" : "text-gray-200"
                } col-span-5 bg-gray-700 group-hover:bg-gray-600 px-3 py-2 text-sm rounded-r-md rtl:rounded-r-none rtl:rounded-l-md`}
              >
                {locale.label}
              </span>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default LanguageSelector;
