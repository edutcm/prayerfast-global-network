// import libs
import React from "react";
import { PageContextProps } from "../../gatsby/data-props";
import { rtl } from "../../services/locales";
import { useStaticQuery, graphql } from "gatsby";
import { getSrc } from "gatsby-plugin-image";

interface SeoProps {
  siteName: string;
  pageContext: PageContextProps;
}

const Seo = ({ siteName, pageContext }: SeoProps) => {
  const isRTL = rtl.includes(pageContext.locale);

  const { logo, socialGraphic, site } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 32)
        }
      }
      socialGraphic: file(relativePath: { eq: "social.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 1200)
        }
      }
      site {
        siteMetadata {
          title
          siteUrl
          siteDescription
          authorName
        }
      }
    }
  `);

  // share image
  const shareImage = `${site.siteMetadata.siteUrl}${getSrc(socialGraphic)}`;

  // page url
  const pageUrl = `${site.siteMetadata.siteUrl}/${pageContext.locale}${pageContext.navSlug}`;

  // meta information
  const meta = [
    {
      name: "description",
      content: site.siteMetadata.siteDescription,
    },
    {
      property: "og:url",
      content: pageUrl,
    },
    {
      property: "og:title",
      content: site.siteMetadata.title,
    },
    {
      property: "og:description",
      content: site.siteMetadata.siteDescription,
    },
    {
      property: "og:image",
      content: shareImage,
    },
    {
      property: "og:image:alt",
      content: site.siteMetadata.title,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content: shareImage,
    },
    {
      property: "twitter:creator",
      content: site.siteMetadata.authorName,
    },
    {
      property: "twitter:title",
      content: site.siteMetadata.title,
    },
    {
      property: "twitter:description",
      content: site.siteMetadata.siteDescription,
    },
  ];

  return (
    <>
      <title>{`${pageContext.title} | ${siteName}`}</title>
      <link rel="canonical" href={pageUrl} />
      <link
        rel="icon"
        type="image/png"
        href={getSrc(logo) || ""}
        sizes="16x16"
      />
      {meta.map((item, idx) => {
        return <meta key={idx} {...item} />;
      })}
    </>
  );
};

export default Seo;
