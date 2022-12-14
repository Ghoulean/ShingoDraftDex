import * as React from "react";
import { Link } from "gatsby";
import { Icons } from "@pkmn/img";
import { GenerationNum } from "@pkmn/data";
import { getBaseSpeciesDisplayName, getUrlPath } from "../utils/url";

export type PokemonIconProps = {
    gen: GenerationNum;
    pokemonDisplayName: string;
    link?: boolean;
};

export const PokemonIcon = (props: PokemonIconProps) => {
    // TODO: rehost images
    const { css } = Icons.getPokemon(props.pokemonDisplayName, {});
    if (props.link) {
        const path: string = getUrlPath(
            props.gen,
            getBaseSpeciesDisplayName(props.gen, props.pokemonDisplayName)!
        );
        return (
            <Link to={path}>
                <span style={css}></span>
            </Link>
        );
    } else {
        return <span style={css}></span>;
    }
};
