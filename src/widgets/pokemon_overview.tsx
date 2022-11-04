import * as React from "react";
import { GenerationNum, Specie } from "@pkmn/data";
import styled from "@emotion/styled";
import { Sprite } from "./sprite";

const Box = styled.nav({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

export type PokemonOverviewProps = {
    gen: GenerationNum;
    specie: Specie;
};

export const PokemonOverview = (props: PokemonOverviewProps) => {
    return (
        <Box>
            <Sprite gen={props.gen} pokemonDisplayName={props.specie.name} />
            <div
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(props.specie),
                    }}
                />
        </Box>
    )
};
