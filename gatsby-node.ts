import path from "path";
import type { GatsbyNode } from "gatsby";
import type { Pokemon } from "./src/models/Pokemon";
import { GenerationNum } from "@pkmn/dex-types";

export const createPages: GatsbyNode["createPages"] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;

    // make graphql call
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
    `);

    // group by base species/dex number
    // there currently is no pokemon family that maps to the same base species but not dex number,
    // or to the same dex number but not base species
    // gamefreak please don't troll me
    const groupedPokemon: { [key: string]: Pokemon[] } = {};

    allMarkdown.data!.allMdx.edges.forEach((edge) => {
        const pokemon: Pokemon = edge.node.frontmatter;
        if (!(pokemon.baseId in groupedPokemon)) {
            groupedPokemon[pokemon.baseId] = [pokemon];
        } else {
            groupedPokemon[pokemon.baseId].push(pokemon);
        }
    });

    // create pages
    const groupedPokemonKeys: string[] = Object.keys(groupedPokemon);
    for (const baseSpecies of groupedPokemonKeys) {
        const pokemonGroup: Pokemon[] = groupedPokemon[baseSpecies];
        const basePokemon: Pokemon = pokemonGroup.find(
            (pokemon) => pokemon.displayName === pokemon.baseId
        )!;
        createPage({
            path: getUrlPath(basePokemon.generation, basePokemon.displayName),
            component: path.resolve("./src/templates/pokemon_article.tsx"),
            context: {
                generation: basePokemon.generation,
                dexNumber: basePokemon.dexNumber,
            },
        });
    }
};

const getUrlPath = (
    generation: GenerationNum,
    baseSpeciesDisplayName: string
): string => {
    return `pokemon/${generation.toString()}/${encodeURIComponent(
        baseSpeciesDisplayName.toLowerCase().replace(/[^a-z0-9 _-]+/gi, "-")
    )}`;
};
