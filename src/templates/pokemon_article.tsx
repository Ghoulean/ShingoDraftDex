import React from "react";
import styled from "@emotion/styled";
import type { Pokemon } from "../models/Pokemon";
import { graphql } from "gatsby";
import { Natdex } from "../utils/natdex";
import { GenerationNum, Specie } from "@pkmn/data";
import Sprite from "../widgets/sprite";

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
