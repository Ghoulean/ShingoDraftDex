import React from "react";
import styled from "@emotion/styled";
import type { Pokemon } from "../models/Pokemon";
import { graphql } from "gatsby";
import { AnalysisRenderer } from "../widgets/analysis_renderer";

const Centered = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

export default function PokemonArticle(props: {
    data: {
        mdx: { frontmatter: Pokemon };
    };
    children: any;
}) {
    return (
        <Centered>
            <div>
                <h1></h1>
                <AnalysisRenderer>{props.children}</AnalysisRenderer>
            </div>
        </Centered>
    );
}

export const query = graphql`
    query ($generation: Int!, $idName: String!) {
        mdx(
            frontmatter: {
                generation: { eq: $generation }
                idName: { eq: $idName }
            }
        ) {
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
`;
