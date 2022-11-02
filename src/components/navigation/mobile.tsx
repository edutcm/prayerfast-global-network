// import libs
import React from "react";
import { useAppContext } from "../../services/app";
import { locales as langs, getLocalizedPath } from "../../services/locales";
import { PageContextProps } from "../../gatsby/data-props";
import { Link } from "gatsby";

// import components
import { Drawer } from "../drawer";
import { HiOutlineMap, HiOutlineCalendar } from "react-icons/hi";
import { BiBookmark } from "react-icons/bi";

export interface MobileMenuProps {
  pageContext: any;
  locales: any;
}

export const MobileMenu = ({ pageContext, locales }: MobileMenuProps) => {
  const { mobileMenu, setMobileMenu } = useAppContext();

  const { navigation } = locales.frontmatter;

  return (
    <Drawer
      title={locales.frontmatter.navigation.menu}
      isOpen={mobileMenu}
      setIsOpen={setMobileMenu}
      locales={locales}
    >
      <div className="p-5 space-y-3">
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
    </Drawer>
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
  pageContext,
}: NavigationItemProps) => {
  const active = slug === activeSlug;

  const localizedUrl = getLocalizedPath(slug, pageContext.locale);

  return (
    <Link className="flex justify-end" to={localizedUrl}>
      <div
        className={`flex flex-row items-center gap-2 group text-white ${
          active ? "text-emerald-200" : "text-white hover:text-emerald-300"
        }`}
      >
        <span
          className={`w-full ${
            active
              ? "text-emerald-200"
              : "text-white group-hover:text-emerald-300"
          }`}
        >
          {label}
        </span>
        {Icon}
      </div>
    </Link>
  );
};
