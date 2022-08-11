import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `PrayerFast Global Network`,
    siteUrl: `https://prayerfast.org`,
    siteDescription: `The PrayerFast Global Network is people, churches, and organizations called and committed to praying like Jesus did.  Motivated by His love. Committed to His mission. And empowered by His Spirit.`,
    authorName: `PrayerFast Global Network`,
    authorUrl: `https://prayerfast.org`,
  },
  trailingSlash: "always",
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "1234567890",
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        // googleTagManager: {
        //   trackingId: "YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-google-tagmanager", // default
        //   dataLayerName: "dataLayer", // default
        // },
        // facebookPixel: {
        //   pixelId: "YOUR_FACEBOOK_PIXEL_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-facebook-pixel", // default
        // },
        // tikTokPixel: {
        //   pixelId: "YOUR_TIKTOK_PIXEL_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-tiktok-pixel", // default
        // },
        // hotjar: {
        //   hjid: "YOUR_HOTJAR_ID",
        //   hjsv: "YOUR_HOTJAR_SNIPPET_VERSION",
        //   cookieName: "gatsby-gdpr-hotjar", // default
        // },
        // linkedin: {
        //   trackingId: "YOUR_LINKEDIN_TRACKING_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-linked-in", // default
        // },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        codegen: true,
      },
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet-async",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {},
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
    },
    {
      resolve: "gatsby-transformer-csv",
      options: {
        noHeader: true,
      },
    },
    // "gatsby-transformer-remark",
    {
      resolve: "gatsby-background-image",
      options: {
        specialChars: "/:",
      },
    },
  ],
};

export default config;
