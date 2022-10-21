import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Shingo Draft Dex`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `Resource for competitive Pokemon in draft league format`,
    author: `Ghoulean`,
    social: {
      github: {
        name: "Github",
        username: "Ghoulean",
        url: "https://github.com/Ghoulean",
      },
    },
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pokemon",
        path: "./src/pokemon/",
      },
      __key: "pokemon",
    },
  ],
};

export default config;
