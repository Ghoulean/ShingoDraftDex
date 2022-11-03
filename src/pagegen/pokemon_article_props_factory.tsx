import path from "path";
import { GenerationNum } from "@pkmn/types";
import { Pokemon } from "../models/Pokemon";
import { getUrlPath } from "../utils/url";
import { PageProps, PagePropsFactory } from "./page_props_factory";

const POKEMON_ARTICLE_QUERY = `
query loadPageQuery {
    allMdx(sort: { order: [ASC], fields: [frontmatter___dexNumber] }) {
        edges {
            node {
                frontmatter {
                    generation
                    dexNumber
                    idName
                    baseId
                    displayName
                    rating
                    specialConditions
                    tags
                }
            }
        }
    }
}
`;

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
            data?: { allMdx: { edges: { node: { frontmatter: Pokemon } }[] } };
        } = await graphql(POKEMON_ARTICLE_QUERY);

        // group by base species/dex number
        // there currently is no pokemon family that maps to the same base species but not dex number,
        // or to the same dex number but not base species
        // hopefully it stays that way
        const groupedPokemon: { [key: string]: Pokemon[] } = {};

        pokemonArticleMarkdown.data!.allMdx.edges.forEach((edge) => {
            const pokemon: Pokemon = edge.node.frontmatter;
            if (!(pokemon.baseId in groupedPokemon)) {
                groupedPokemon[pokemon.baseId] = [pokemon];
            } else {
                groupedPokemon[pokemon.baseId].push(pokemon);
            }
        });

        const pageProps: PageProps[] = [];

        const groupedPokemonKeys: string[] = Object.keys(groupedPokemon);
        for (const baseSpecies of groupedPokemonKeys) {
            const pokemonGroup: Pokemon[] = groupedPokemon[baseSpecies];
            const basePokemon: Pokemon = pokemonGroup.find(
                (pokemon) => pokemon.displayName === pokemon.baseId
            )!;
            pageProps.push({
                path: getUrlPath(
                    basePokemon.generation,
                    basePokemon.displayName
                ),
                component: path.join(
                    __dirname,
                    "..",
                    "templates",
                    "pokemon_article.tsx"
                ),
                context: {
                    generation: basePokemon.generation,
                    dexNumber: basePokemon.dexNumber,
                },
            });
        }
        return pageProps;
    }
}
