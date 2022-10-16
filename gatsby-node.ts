import path from "path";
import type { GatsbyNode } from "gatsby";

type Pokemon = {
  title: string;
  generation: number;
  dexNumber: number;
  idName: string;
  displayName: string | string[];
  rating: number | number[];
  specialConditions?: string | string[];
  tags?: string[];
};

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
              title
              generation
              dexNumber
              idName
              displayName
              rating
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
      component: path.resolve(
        __dirname,
        "src",
        "pokemon",
        pokemon.generation.toString(),
        pokemon.idName + ".mdx"
      ),
    });
  });
};
