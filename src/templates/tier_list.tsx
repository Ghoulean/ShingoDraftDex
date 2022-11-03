import React from "react";
import styled from "@emotion/styled";
import type { Pokemon } from "../models/Pokemon";
import { graphql } from "gatsby";
import { GenerationNum, Specie } from "@pkmn/data";
import { Icon } from "../widgets/icon";

type PokemonRatingBucket = {
    rating: number;
    pokemon: Pokemon[];
};

const Centered = styled.nav({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

export default function GenerationTierList(props: {
    data: {
        allMdx: { edges: { node: { frontmatter: Pokemon; body: string } }[] };
    };
}) {
    const edges = props.data.allMdx!.edges;
    const pokemons: Pokemon[] = edges.map((edge) => {
        return edge.node.frontmatter;
    });
    const generation: GenerationNum = pokemons[0].generation;
    const unratedPokemonBucket: PokemonRatingBucket = {
        rating: -2,
        pokemon: [],
    };
    const bannedPokemonBucket: PokemonRatingBucket = {
        rating: -1,
        pokemon: [],
    };
    const ratedPokemonBuckets: PokemonRatingBucket[] = [];

    for (const pokemon of pokemons) {
        const pokemonRating: number = +pokemon.rating;
        if (pokemonRating === -2) {
            unratedPokemonBucket.pokemon.push(pokemon);
        } else if (pokemonRating === -1) {
            bannedPokemonBucket.pokemon.push(pokemon);
        } else {
            let bucket = ratedPokemonBuckets.find(
                (b) => b.rating === Math.floor(pokemonRating)
            );
            if (bucket === undefined) {
                bucket = {
                    rating: pokemonRating,
                    pokemon: [pokemon],
                };
                ratedPokemonBuckets.push(bucket);
            } else {
                bucket.pokemon.push(pokemon);
            }
        }
    }
    ratedPokemonBuckets.sort((a, b) => {
        return a.rating - b.rating;
    });
    const maxRating: number = ratedPokemonBuckets[ratedPokemonBuckets.length - 1].rating;

    const tiers = [];
    for (let i = 0; i <= maxRating; i += 1) {
        const pokemonInTier: Pokemon[] =
            ratedPokemonBuckets.find((b) => b.rating === i)?.pokemon || [];
        tiers.push(
            <div>
                {pokemonInTier.map((pokemon: Pokemon) => {
                    return (
                        <Icon
                            gen={pokemon.generation}
                            pokemonDisplayName={pokemon.displayName}
                            link={true}
                        />
                    );
                })}
            </div>
        );
    }
    const unratedTier = unratedPokemonBucket.pokemon.map((pokemon: Pokemon) => {
        return (
            <Icon
                gen={pokemon.generation}
                pokemonDisplayName={pokemon.displayName}
                link={true}
            />
        );
    });
    const bannedTier = bannedPokemonBucket.pokemon.map((pokemon: Pokemon) => {
        return (
            <Icon
                gen={pokemon.generation}
                pokemonDisplayName={pokemon.displayName}
                link={true}
            />
        );
    });

    return (
        <Centered>
            {tiers.map((tier, i) => {
                return (
                    <div>
                        <p>Rating: {i}</p>
                        <div>{tier}</div>
                        <br />
                    </div>
                );
            })}
            <div>
                <p>Rating: unrated</p>
                <div>{unratedTier}</div>
                <br />
            </div>
            <div>
                <p>Rating: banned</p>
                <div>{bannedTier}</div>
                <br />
            </div>
        </Centered>
    );
}

export const query = graphql`
    query ($generation: Int!) {
        allMdx(filter: { frontmatter: { generation: { eq: $generation } } }) {
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
                }
            }
        }
    }
`;
