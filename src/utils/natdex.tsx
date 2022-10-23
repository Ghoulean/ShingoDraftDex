import { Data, Dex } from "@pkmn/dex";
import { Generations } from "@pkmn/data";

const NATDEX_UNOBTAINABLE_SPECIES = [
    "Eevee-Starter",
    "Floette-Eternal",
    "Pichu-Spiky-eared",
    "Pikachu-Belle",
    "Pikachu-Cosplay",
    "Pikachu-Libre",
    "Pikachu-PhD",
    "Pikachu-Pop-Star",
    "Pikachu-Rock-Star",
    "Pikachu-Starter",
    "Eternatus-Eternamax",
];
const natdexFilter = (d: Data): boolean => {
    if (!d.exists) {
        return false;
    }
    if ("isNonstandard" in d && d.isNonstandard && d.isNonstandard !== "Past") {
        return false;
    }
    if (d.kind === "Ability" && d.id === "noability") {
        return false;
    }
    if ("tier" in d && d.tier === "Unreleased") {
        return false;
    }
    if (d.kind === "Species" && NATDEX_UNOBTAINABLE_SPECIES.includes(d.name)) {
        return false;
    }
    return true;
};

export const Natdex = new Generations(Dex, natdexFilter);
