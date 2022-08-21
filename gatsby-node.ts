import { report } from "process";

const path = require("path");

/**
 * Add locale field to nodes based on netlify cms folder structure
 */
const createFields = require("./src/gatsby/create-fields");

exports.onCreateNode = async ({ node, actions, reporter }) => {
  await createFields({ node, actions, reporter });
};

/**
 * Create Pages
 */
const createPages = require("./src/gatsby/create-pages");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createRedirect } = actions;
  // create pages
  const pageActivity = reporter.activityTimer(`Create page`);
  pageActivity.start();
  await createPages({ actions, graphql, reporter });
  pageActivity.end();

  createRedirect({
    fromPath: "/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/en/`,
  });
};

/**
 * Create Custom Resolvers
 */
const createCustomResolvers = require("./src/gatsby/create-resolvers");

exports.createResolvers = async ({ createResolvers, reporter }) => {
  const activity = reporter.activityTimer("Create Custom Resolvers");
  activity.start();
  await createCustomResolvers({ createResolvers });
  activity.end();
};

/**
 *
 */
const createSchemaCustomization = require("./src/gatsby/create-schema-customization");

exports.createSchemaCustomization = async ({ actions, reporter, schema }) => {
  const activity = reporter.activityTimer("Create Schema Customization");
  activity.start();
  await createSchemaCustomization({ actions });
  activity.end();
};

/**
 * Customize Webpack Config
 * @param {*} param0
 */
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-leaflet|leaflet|leaflet.heat/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
