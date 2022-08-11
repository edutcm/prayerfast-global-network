// import libs
import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { locales as langs, getLocalizedPath } from "../../services/locales";
import _ from "lodash";
import { PageContextProps } from "../../gatsby/data-props";

// import components
import { AppContext } from "../../services/app";
import {
  HomeIcon,
  BookOpenIcon,
  TranslateIcon,
  // SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface NavigationProps {
  pageContext: PageContextProps;
  locales: any;
}

const Navigation = ({ pageContext, locales }: NavigationProps) => {
  const languageLabel = _.find(langs, { key: pageContext.locale });

  const { switcher, toggleSwitcher } = useContext(AppContext);

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
    <nav className="flex md:flex-col justify-between px-20 md:px-0 items-center h-full md:pt-5 md:justify-start">
      {logoImage && (
        <Link to={homeUrl} className="hidden md:block">
          <GatsbyImage
            image={logoImage}
            className="w-8 h-8 mr-3 md:mb-3 md:mr-0"
            alt={``}
          />
        </Link>
      )}
      <NavigationItem
        slug="/"
        activeSlug={pageContext.navSlug}
        label={navigation.home}
        Icon={<HomeIcon className="h-5 w-5" />}
        pageContext={pageContext}
      />
      <NavigationItem
        slug="/resources/"
        activeSlug={pageContext.navSlug}
        label={navigation.resources}
        Icon={<BookOpenIcon className="h-5 w-5" />}
        pageContext={pageContext}
      />
      {/* <NavigationItem
        slug="/mobilize/"
        activeSlug={pageContext.navSlug}
        label={navigation.mobilize}
        Icon={<SwitchHorizontalIcon className="h-5 w-5" />}
        pageContext={pageContext}
      /> */}
      {langs.length > 1 && (
        <NavigationItem
          slug="#"
          activeSlug={pageContext.navSlug}
          label={languageLabel?.label}
          Icon={<TranslateIcon className="h-5 w-5" />}
          onClick={() => toggleSwitcher(!switcher)}
          pageContext={pageContext}
        />
      )}
    </nav>
  );
};

interface NavigationItemProps {
  slug?: string;
  activeSlug?: string;
  label?: string;
  Icon: React.ReactNode;
  onClick?: any;
  pageContext: PageContextProps;
}

const NavigationItem = ({
  slug = "/",
  activeSlug,
  label = "label",
  Icon,
  onClick,
  pageContext,
}: NavigationItemProps) => {
  const active = slug === activeSlug;

  if (onClick) {
    return (
      <div
        className={`flex justify-center items-center py-2 px-3 flex-col cursor-pointer ${
          active ? "text-emerald-300" : "text-white hover:text-emerald-300"
        }`}
        onClick={() => onClick()}
      >
        {Icon}
        {label && <span className="text-xs">{label}</span>}
      </div>
    );
  }

  const localizedUrl = getLocalizedPath(slug, pageContext.locale);

  return (
    <Link
      className={`flex justify-center items-center py-2 px-3 flex-col group text-white ${
        active ? "text-emerald-300" : "text-white hover:text-emerald-300"
      }`}
      to={localizedUrl}
    >
      {Icon}
      <span
        className={`text-xs ${
          active
            ? "text-emerald-300"
            : "text-white group-hover:text-emerald-300"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default Navigation;
