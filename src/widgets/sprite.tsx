import * as React from "react";
import { Sprites } from "@pkmn/img";
import { GenerationNum } from "@pkmn/data";

export type SpriteProps = {
    gen: GenerationNum;
    pokemonDisplayName: string;
};

export const Sprite = (props: SpriteProps) => {
    // TODO: rehost images
    const { url } = Sprites.getPokemon(props.pokemonDisplayName, {
        gen: props.gen,
    });
    return <img src={url}></img>;
};
