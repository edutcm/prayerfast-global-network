// import libs

module.exports = async ({ node, actions, reporter }) => {
  if (node.internal.type !== `Mdx`) return;

  const { createNodeField } = actions;

  const createLocaleField = async (node, splitPath, templateKey) => {
    const filename = node.fileAbsolutePath.split(splitPath);
    const locale = filename[1].split(".")[1];

    // console output
    reporter.verbose(
      `[locale field] ${locale} -> ${templateKey}: ${filename[1]}`
    );

    await createNodeField({
      node,
      name: "locale",
      value: locale,
    });

    await createNodeField({
      node,
      name: "templateKey",
      value: templateKey,
    });
  };

  if (
    node.fileAbsolutePath &&
    node.fileAbsolutePath.includes("content/locales")
  ) {
    await createLocaleField(node, "/content/locales/", "locale");
  }

  if (
    node.fileAbsolutePath &&
    node.fileAbsolutePath.includes("content/pages")
  ) {
    await createLocaleField(node, "/content/pages/", "page");
  }
};
