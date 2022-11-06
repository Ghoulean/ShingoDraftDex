import * as React from "react";
import { GenerationNum, Specie, TypeName } from "@pkmn/data";
import styled from "@emotion/styled";
import { Sprite } from "./sprite";
import { TypeIcon } from "./type_icon";

const Box = styled.nav({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

const TypeAbilityHolder = styled.nav({
    display: "flex",
    flexDirection: "column",
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
            <TypeAbilityHolder>
                {props.specie.types.map((typeName: TypeName) => {
                    return <TypeIcon typeName={typeName} />;
                })}
            </TypeAbilityHolder>
            <div
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(props.specie),
                }}
            />
        </Box>
    );
};
