module.exports = async ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `

    type Frontmatter @dontInfer {
      image1: [File] @fileByRelativePath
      image2: [File] @fileByRelativePath
      image3: [File] @fileByRelativePath
    }

	`;

  createTypes(typeDefs);
};
