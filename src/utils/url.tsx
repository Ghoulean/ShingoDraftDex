import { GenerationNum } from "@pkmn/types";
import { Natdex } from "./natdex";

export const getBaseSpeciesDisplayName = (
    generation: GenerationNum,
    displayName: string
): string | undefined => {
    return Natdex.get(generation).species.get(displayName)?.baseSpecies;
};

export const getUrlPath = (
    generation: GenerationNum,
    baseSpeciesDisplayName: string
): string => {
    return `/pokemon/${generation.toString()}/${encodeURIComponent(
        baseSpeciesDisplayName.toLowerCase().replace(/[^a-z0-9 _-]+/gi, "-")
    )}`;
};
