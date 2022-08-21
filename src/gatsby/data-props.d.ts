// imports
import { Mdx, MdxEdge, MdxGroupConnection } from "./graphql-types";
import { SitePageContext } from "../graphql-types";
import { RouteComponentProps } from "@reach/router";
import { IGatsbyImageData } from "gatsby-plugin-image";

// data props for templates
export interface DataProps extends RouteComponentProps {
  data: {
    page?: Mdx;
    logo?: IGatsbyImageData;
    locales?: Mdx;
  };
  pageContext: PageContextProps;
}

// extend page context interface
export interface PageContextProps extends SitePageContext {
  locale: string;
  defaultLocale?: string;
  currentPage?: number;
  numPages?: number;
  slug: string;
  navSlug: string;
  title: string;
}

// event props interface
export interface EventsProps extends MdxGroupConnection {
  edges: Array<MdxEdge>;
}
