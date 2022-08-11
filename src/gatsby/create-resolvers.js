module.exports = async ({ createResolvers }) => {
  const resolvers = {
    Query: {
      pageByLocale: {
        type: "Mdx",
        args: {
          locale: "String!",
          slug: "String!",
        },
        async resolve(source, args, context, info) {
          return await context.nodeModel.findOne({
            query: {
              filter: {
                frontmatter: { slug: { eq: args.slug } },
                fields: {
                  locale: { eq: args.locale },
                  templateKey: { eq: "page" },
                },
              },
            },
            type: "Mdx",
            firstOnly: true,
          });
        },
      },
      // resourceByLocale: {
      //   type: "Mdx",
      //   args: {
      //     locale: "String!",
      //     slug: "String!",
      //   },
      //   async resolve(source, args, context, info) {
      //     return await context.nodeModel.findOne({
      //       query: {
      //         filter: {
      //           frontmatter: { slug: { eq: args.slug } },
      //           fields: {
      //             locale: { eq: args.locale },
      //             templateKey: { eq: "resource" },
      //           },
      //         },
      //       },
      //       type: "Mdx",
      //       firstOnly: true,
      //     });
      //   },
      // },
      // mobilizeByLocale: {
      //   type: "Mdx",
      //   args: {
      //     locale: "String!",
      //     slug: "String!",
      //   },
      //   async resolve(source, args, context, info) {
      //     return await context.nodeModel.findOne({
      //       query: {
      //         filter: {
      //           frontmatter: { slug: { eq: args.slug } },
      //           fields: {
      //             locale: { eq: args.locale },
      //             templateKey: { eq: "mobilize" },
      //           },
      //         },
      //       },
      //       type: "Mdx",
      //       firstOnly: true,
      //     });
      //   },
      // },
      localesByLocale: {
        type: "Mdx",
        args: {
          locale: "String!",
          // slug: "String!",
        },
        async resolve(source, args, context, info) {
          return await context.nodeModel.findOne({
            query: {
              filter: {
                // frontmatter: { slug: { eq: args.slug } },
                fields: {
                  locale: { eq: args.locale },
                  templateKey: { eq: "locale" },
                },
              },
            },
            type: "Mdx",
            firstOnly: true,
          });
        },
      },
    },
  };
  return await createResolvers(resolvers);
};
