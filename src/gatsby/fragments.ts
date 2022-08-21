import { graphql } from "gatsby";

// page fragment
export const PageFragment = graphql`
  fragment PageFragment on Mdx {
    id
    frontmatter {
      slug
      title
      image1 {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      image2 {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    fields {
      locale
      templateKey
    }
    body
  }
`;

// locale fragment
export const LocaleFragment = graphql`
  fragment LocaleFragement on Mdx {
    frontmatter {
      siteName
      navigation {
        home
        resources
        mobilize
      }
      misc {
        getTheBook
        chooseLanguage
        close
      }
    }
    fields {
      templateKey
      locale
    }
  }
`;
