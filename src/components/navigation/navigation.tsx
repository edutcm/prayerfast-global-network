// import libs
import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { locales as langs, getLocalizedPath } from "../../services/locales";
import _ from "lodash";
import { PageContextProps } from "../../gatsby/data-props";

// import components
import { AppContext, useAppContext } from "../../services/app";
import {
  HiOutlineMap,
  HiOutlineCalendar,
  HiOutlineMenu,
  HiOutlineTranslate,
} from "react-icons/hi";
import { BiBookmark } from "react-icons/bi";

import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface NavigationProps {
  pageContext: PageContextProps;
  locales: any;
}

const Navigation = ({ pageContext, locales }: NavigationProps) => {
  const { setMobileMenu } = useContext(AppContext);

  const { navigation } = locales.frontmatter;

  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  const logoImage = getImage(logo);

  const homeUrl = getLocalizedPath("/", pageContext.locale);

  return (
    <nav
      className={`flex justify-between items-center px-5 py-3 md:px-10 fixed z-[9000] w-screen backdrop-blur-md xl:backdrop-blur-0 ${
        pageContext.slug === "index"
          ? "bg-gray-900/70 !backdrop-blur-sm"
          : "bg-gray-900/20"
      }`}
    >
      <div className="flex flex-row items-center ">
        {logoImage && (
          <Link to={homeUrl}>
            <GatsbyImage
              image={logoImage}
              className="w-10 h-10 mr-3"
              alt={``}
            />
          </Link>
        )}
        <div className="text-white text-lg">
          <span>PrayerFast </span>
          <span className="hidden md:inline-block">Global Network</span>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="hidden md:flex flex-row items-center space-x-3 mr-10 text-sm">
          <NavigationItem
            slug="/"
            activeSlug={pageContext.navSlug}
            label={navigation.home}
            Icon={<HiOutlineMap className="h-5 w-5" />}
            pageContext={pageContext}
          />
          <NavigationItem
            slug="/resources/"
            activeSlug={`${pageContext.navSlug}/`}
            label={navigation.resources}
            Icon={<BiBookmark className="h-5 w-5" />}
            pageContext={pageContext}
          />
          <NavigationItem
            slug="/calendar/"
            activeSlug={`${pageContext.navSlug}/`}
            label={navigation.calendar}
            Icon={<HiOutlineCalendar className="h-5 w-5" />}
            pageContext={pageContext}
          />
        </div>
        <LangSwitcher pageContext={pageContext} langs={langs} />
        <HiOutlineMenu
          className="h-5 w-5 text-white cursor-pointer md:hidden"
          onClick={() => setMobileMenu(true)}
        />
      </div>
    </nav>
  );
};

interface NavigationItemProps {
  slug?: string;
  activeSlug?: string;
  label?: string;
  Icon: React.ReactNode;
  pageContext: PageContextProps;
}

const NavigationItem = ({
  slug = "/",
  activeSlug,
  label = "label",
  Icon,
  pageContext,
}: NavigationItemProps) => {
  const active = slug === activeSlug;

  const localizedUrl = getLocalizedPath(slug, pageContext.locale);

  return (
    <Link
      className={`flex gap-1 items-center group text-white ${
        active ? "text-emerald-200" : "text-white hover:text-emerald-300"
      }`}
      to={localizedUrl}
    >
      {Icon}
      <span
        className={`w-full text-center ${
          active
            ? "text-emerald-200"
            : "text-white group-hover:text-emerald-300"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

interface LangSwitcherProps {
  pageContext: PageContextProps;
  langs: any;
}

const LangSwitcher = ({ pageContext, langs }: LangSwitcherProps) => {
  const { switcher, toggleSwitcher } = useAppContext();

  const languageLabel = _.find(langs, { key: pageContext.locale });

  if (langs.length === 1) {
    return null;
  }

  return (
    <div
      className="mr-3 md:mr-0 flex flex-row items-center text-white cursor-pointer hover:text-emerald-300"
      onClick={() => {
        if (toggleSwitcher) toggleSwitcher(!switcher);
      }}
    >
      <HiOutlineTranslate className="h-5 w-5" />
      <span className="text-xs ml-1 uppercase">{languageLabel?.key}</span>
    </div>
    // <NavigationItem
    //   slug="#"
    //   activeSlug={pageContext.navSlug}
    //   label={languageLabel?.label}
    //   Icon={}
    //   pageContext={pageContext}
    // />
  );
};

export default Navigation;
