import path from "path";
import type { GatsbyNode } from "gatsby";
import type { Pokemon } from "./src/models/Pokemon";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const allMarkdown: {
    errors?: any;
    data?: { allMdx: { edges: { node: { frontmatter: Pokemon } }[] } };
  } = await graphql(`
    query loadPageQuery {
      allMdx(sort: { order: [ASC], fields: [frontmatter___dexNumber] }) {
        edges {
          node {
            frontmatter {
              generation
              dexNumber
              idName
              displayName
              rating
              specialConditions
              tags
            }
          }
        }
      }
    }
  `);

  allMarkdown.data!.allMdx.edges.forEach((edge) => {
    const pokemon: Pokemon = edge.node.frontmatter;
    createPage({
      path: `pokemon/${pokemon.generation.toString()}/${pokemon.idName}`,
      component: path.resolve("./src/templates/pokemon_article.tsx"),
      context: { generation: pokemon.generation, dexNumber: pokemon.dexNumber },
      /*component: path.resolve(
        __dirname,
        "src",
        "pokemon",
        pokemon.generation.toString(),
        pokemon.idName + ".mdx"
      ),*/
    });
  });
};
