import React from "react";
import styled from "@emotion/styled";
import type { Pokemon } from "../models/Pokemon";
import { graphql } from "gatsby";
import { Natdex } from "../utils/natdex";
import { GenerationNum, Specie } from "@pkmn/data";

const Centered = styled.nav({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  margin: "0 auto",
  padding: "10px 0 0",
});

export default function PokemonArticle(props: { data: { allMdx: { edges: { node: {frontmatter: Pokemon, body: string}}[] } } }) {
  const node = props.data.allMdx!.edges[0].node;
  const pokemon: Pokemon = {
    ...node.frontmatter
  }
  const body: string = node.body;
  const specie: Specie[] = pokemon.displayName.map((name) => {
    return Natdex.get(pokemon.generation as GenerationNum).species.get(name)!
  });

  return (
    <Centered>
      <div>
        <h1>{pokemon.displayName[0]}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(specie),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
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
