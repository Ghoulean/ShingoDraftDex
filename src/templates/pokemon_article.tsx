import React from "react";
import styled from "@emotion/styled";
import type { Pokemon } from "../models/Pokemon";
import { graphql } from "gatsby";
import { Natdex } from "../utils/natdex";
import { GenerationNum, Specie } from "@pkmn/data";
import { Sprite } from "../widgets/sprite";
import { Analysis } from "../widgets/analysis/analysis";

const Centered = styled.nav({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

export default function PokemonArticle(props: {
    data: {
        allMdx: { edges: { node: { frontmatter: Pokemon; body: string } }[] };
    };
}) {
    const edges = props.data.allMdx!.edges;
    const pokemon: Pokemon[] = edges.map((edge) => {
        return edge.node.frontmatter;
    });

    const articleBodies: string[] = edges.map((edge) => {
        return edge.node.body;
    });

    const specie: Specie[] = pokemon.map((pokemon) => {
        return Natdex.get(pokemon.generation as GenerationNum).species.get(
            pokemon.displayName
        )!;
    });
    // assumption: all pokemon here are of same generation
    const generation: GenerationNum = pokemon[0].generation;
    const pokemonToMarkdownBodyMap: {
        [pokemonDisplayName: string]: {
            pokemon: Pokemon;
            rawMarkdownBody: string;
        };
    } = {};
    for (const edge of edges) {
        pokemonToMarkdownBodyMap[edge.node.frontmatter.displayName] = {
            pokemon: edge.node.frontmatter,
            rawMarkdownBody: edge.node.body,
        };
    }
    return (
        <Centered>
            <div>
                <h1>{pokemon[0].displayName}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(specie),
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: articleBodies.join("\n"),
                    }}
                />
                <Analysis
                    generation={generation}
                    orderedPokemonList={pokemon.map((pokemon) => {
                        return pokemon.displayName;
                    })}
                    pokemonToMarkdownBodyMap={pokemonToMarkdownBodyMap}
                ></Analysis>
                {pokemon.map((pokemon: Pokemon) => {
                    return (
                        <Sprite
                            gen={pokemon.generation}
                            pokemonDisplayName={pokemon.displayName}
                        />
                    );
                })}
            </div>
        </Centered>
    );
}

export const query = graphql`
    query ($generation: Int!, $dexNumber: Int!) {
        allMdx(
            filter: {
                frontmatter: {
                    dexNumber: { eq: $dexNumber }
                    generation: { eq: $generation }
                }
            }
        ) {
            edges {
                node {
                    frontmatter {
                        dexNumber
                        displayName
                        generation
                        idName
                        rating
                        specialConditions
                        tags
                    }
                    body
                }
            }
        }
    }
`;
