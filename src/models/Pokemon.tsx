import { GenerationNum } from "@pkmn/dex-types";

export type Pokemon = {
  generation: GenerationNum;
  dexNumber: number;
  idName: string;
  baseId: string;
  displayName: string;
  rating: number;
  specialConditions: string;
  tags: string[];
};
