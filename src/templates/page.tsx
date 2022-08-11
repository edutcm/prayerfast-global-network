// import libs
import React from "react";
import { graphql } from "gatsby";
import { DataProps } from "../gatsby/data-props";

// import components
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layouts";
import Seo from "../components/seo";

const Page = ({ data, pageContext }: DataProps) => (
  <Layout data={data} pageContext={pageContext}>
    <MDXRenderer
      image1={data.page.frontmatter.image1}
      image2={data.page.frontmatter.image2}
      locale={pageContext.locale}
    >
      {data.page.body}
    </MDXRenderer>
  </Layout>
);

export default Page;

export const pageQuery = graphql`
  query ($slug: String!, $locale: String!) {
    page: pageByLocale(locale: $locale, slug: $slug) {
      ...PageFragment
    }
    locales: localesByLocale(locale: $locale) {
      ...LocaleFragement
    }
  }
`;

export const Head = ({ data, pageContext }: DataProps) => {
  return (
    <Seo
      siteName={data.locales.frontmatter.siteName}
      pageContext={pageContext}
    />
  );
};
