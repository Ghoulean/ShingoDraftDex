import * as React from "react";
import { Sprites } from "@pkmn/img";
import { GenerationNum } from "@pkmn/data";

export type SpriteProps = {
  gen: GenerationNum;
  pokemonDisplayName: string;
};

const Sprite = (props: SpriteProps) => {
  const { url } = Sprites.getPokemon(props.pokemonDisplayName, {
    gen: props.gen,
  });
  return <img src={url}></img>;
};
export default Sprite;
