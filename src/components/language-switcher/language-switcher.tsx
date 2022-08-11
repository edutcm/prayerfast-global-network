// import libs
import React, { useContext } from "react";
import { PageContextProps } from "../../gatsby/data-props";
import { locales as langs, getLocalizedPath } from "../../services/locales";
import { navigate } from "gatsby";

// import components
import { AppContext } from "../../services/app";
import { XCircleIcon } from "@heroicons/react/outline";

// props
interface LanguageSelectorProps {
  pageContext: PageContextProps;
  locales: any;
}

// language selector component
const LanguageSelector = ({ pageContext, locales }: LanguageSelectorProps) => {
  if (langs.length <= 1) return null;

  const { switcher, toggleSwitcher } = useContext(AppContext);

  const changeLocale = (locale: string) => {
    const navigateTo = getLocalizedPath(pageContext.navSlug, locale);
    navigate(navigateTo);
    toggleSwitcher(!switcher);
  };

  if (!switcher) return null;

  return (
    <div className="absolute bg-black/70 w-screen h-screen flex justify-center items-center z-[9999] top-0 left-0">
      <div className="bg-slate-900 w-full px-5 py-3 text-white m-5 rounded-md md:w-5/6 lg:w-3/5 -md">
        <div className="flex flex-col-reverse md:flex-row items-center pb-5">
          <h2 className="text-base md:flex-grow">
            <span>Choose a language</span>{" "}
            {pageContext.locale !== "en" && (
              <span>&bull; {locales.frontmatter.misc.chooseLanguage}</span>
            )}
          </h2>
          <div className="flex justify-end items-center">
            <div
              className="hover:bg-slate-800 flex justify-end items-center cursor-pointer px-3 py-2 rounded-full text-right"
              onClick={() => toggleSwitcher(false)}
            >
              <span className="text-sm">
                Close{" "}
                {pageContext.locale !== "en" && (
                  <span>&bull; {locales.frontmatter.misc.close}</span>
                )}
              </span>
              <XCircleIcon className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-3 md:grid-cols-4 lg:grid-cols-5">
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
                      : "bg-slate-800 text-slate-400"
                  } col-span-2 group-hover:bg-emerald-500 group-hover:text-white px-3 py-2 text-sm rounded-l-md rtl:rounded-r-md rtl:rounded-l-none text-center`}
                >
                  {locale.key}
                </span>
                <span
                  className={`col-span-5 bg-slate-700 group-hover:bg-slate-600 px-3 py-2 text-sm rounded-r-md rtl:rounded-r-none rtl:rounded-l-md`}
                >
                  {locale.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
