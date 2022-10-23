import * as React from "react";
import { Icons } from "@pkmn/img";
import { GenerationNum } from "@pkmn/data";

export type IconProps = {
    gen: GenerationNum;
    pokemonDisplayName: string;
};

export const Icon = (props: IconProps) => {
    const { css } = Icons.getPokemon(props.pokemonDisplayName, {});
    return <span style={css}></span>;
};
