import * as React from "react";
import styled from "@emotion/styled";
import { Pokemon } from "../../models/Pokemon";
import { PokemonIcon } from "../pokemon_icon";
import { GenerationNum } from "@pkmn/types";

export type AnalysisTabProps = {
    generation: GenerationNum;
    pokemonName: string;
    isActive: boolean;
    callback: (event: React.MouseEvent<HTMLElement>) => void;
};

export const AnalysisTab = (props: AnalysisTabProps) => {
    const labelText: string = props.pokemonName;
    const Button = styled.button({
        border: "none",
        outline: "none",
        cursor: "pointer",
        padding: "14px 16px",
        backgroundColor: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#CCCCCC",
        },
    });
    return (
        <Button onClick={props.callback}>
            <PokemonIcon
                gen={props.generation}
                pokemonDisplayName={props.pokemonName}
            />{" "}
            {labelText}
        </Button>
    );
};
