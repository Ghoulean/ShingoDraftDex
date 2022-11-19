import path from "path";
import { GenerationNum } from "@pkmn/types";
import { Pokemon } from "../models/Pokemon";
import { getUrlPath } from "../utils/url";
import { PageProps, PagePropsFactory } from "./page_props_factory";

const POKEMON_ARTICLE_QUERY = `{
    allMdx {
      edges {
        node {
          frontmatter {
            generation
            idName
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  }`;

const POST_TEMPLATE = path.join(
    __dirname,
    "..",
    "templates",
    "pokemon_article.tsx"
);

export type PokemonArticlePropContext = {
    generation: GenerationNum;
    dexNumber: number;
};

export class PokemonArticlePropsFactory extends PagePropsFactory {
    public async createPageProps(
        graphql: (query: string) => Promise<Object>
    ): Promise<PageProps[]> {
        const pokemonArticleMarkdown: {
            errors?: any;
            data?: {
                allMdx: {
                    edges: {
                        node: {
                            frontmatter: Pokemon;
                            internal: { contentFilePath: string };
                        };
                    }[];
                };
            };
        } = await graphql(POKEMON_ARTICLE_QUERY);

        const pageProps: PageProps[] = [];

        const edges = pokemonArticleMarkdown.data!.allMdx.edges;

        for (const edge of edges) {
            const pokemon: Pokemon = edge.node.frontmatter;
            pageProps.push({
                path: getUrlPath(pokemon.generation, pokemon.idName),
                component: `${POST_TEMPLATE}?__contentFilePath=${edge.node.internal.contentFilePath}`,
                context: {
                    generation: pokemon.generation,
                    idName: pokemon.idName,
                },
            });
        }
        return pageProps;
    }
}
