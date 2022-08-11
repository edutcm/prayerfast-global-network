// import libs
import { locales as locales2 } from "../services/locales";
import path from "path";

// get constants
const defaultLocale = process.env.GATSBY_DEFAULT_LOCALE || "en";

const locales = locales2.map((locale) => {
  return locale.key;
});

module.exports = async ({ actions, graphql, reporter }) => {
  // limit per query
  const PER_PAGE = 10;

  // graphql query
  const GET_PAGES = `
  query GET_PAGES($limit: Int, $skip: Int, $locale: String!) {
    pages: allMdx(
      filter: {fields: {locale: {eq: $locale}, templateKey: {eq: "page"}}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
          fields {
            locale
          }
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        pageCount
      }
    }
  }
  `;

  // get needed actions
  const { createPage, createRedirect } = actions;

  // array to store all nodes in
  const allNodes = [];

  // find all default locale pages and created localized versions
  const fetchPages = async (variables) => {
    await graphql(GET_PAGES, variables).then(({ data }) => {
      // get the nodes and pagination data
      const {
        pages: {
          edges,
          pageInfo: { currentPage, hasNextPage },
        },
      } = data;

      // push page to nodes array
      edges.map(({ node }) => {
        allNodes.push(node);
      });

      // if there are more pages, execute the query again
      if (hasNextPage) {
        pageNumber++;
        let skipVal = currentPage * variables.limit;
        return fetchPages({
          limit: variables.limit,
          skip: skipVal,
          locale: variables.locale,
        });
      }

      // return the nodes
      return allNodes;
    });
  };

  // initiaze the query
  await fetchPages({
    limit: PER_PAGE,
    skip: 0,
    locale: defaultLocale,
  }).then(() => {
    // page template component
    const pageTemplate = path.resolve(`${__dirname}/../templates/page.tsx`);

    const parseSlug = (slug) => {
      if (slug === "index") {
        return "/";
      } else {
        return `/${slug}/`;
      }
    };

    // iterate through pages and create localized versions
    allNodes.map((page) => {
      const slug = parseSlug(page.frontmatter.slug);

      // loop through locales and create page
      locales.map((locale) => {
        // build a path with locale
        let path = `/${locale}/${slug}`.replace("//", "/");

        // create page
        reporter.verbose(`[page] ${path}`);
        createPage({
          path: path,
          component: pageTemplate,
          context: {
            title: page.frontmatter.title,
            locale: locale,
            slug: page.frontmatter.slug,
            navSlug: slug,
          },
        });

        // add redirects
        // if (locale === defaultLocale) {
        //   reporter.verbose(`301 Redirect ${path} -> /${locale}${path}`);
        //   createRedirect({
        //     fromPath: slug,
        //     isPermanent: true,
        //     redirectInBrowser: true,
        //     toPath: `/${locale}${slug}`,
        //   });
        // }
      });
    });

    // console output
    reporter.info(
      `Total Pages: ${allNodes.length}, Locales: ${locales.length}`
    );
  });
};
