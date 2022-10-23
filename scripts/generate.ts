#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { Dex } = require("@pkmn/dex");
const { Data, GenerationNum, Generations } = require("@pkmn/data");

// copy paste lol
type Pokemon = {
    generation: number;
    dexNumber: number;
    idName: string;
    baseId: string;
    displayName: string;
    rating: number;
    specialConditions: string;
    tags: string[];
};

const GENERATION = 8;

const getFileDir = (pokemonIdName: string) => {
    return path.join(POST_LOCATION_PREFIX, `${pokemonIdName}.mdx`);
};

const POST_LOCATION_PREFIX = path.join(
    __dirname,
    "../src/pokemon/",
    GENERATION.toString()
);

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
const natdexFilter = (d: typeof Data, g: typeof GenerationNum) => {
    if (g !== 8) {
        return Generations.DEFAULT_EXISTS(d, g);
    }
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

const getFileContent = (pokemon: Pokemon) => {
    const toArrayStr = (arr: string[]): string => {
        return `[${arr
            .map((str) => {
                return `"${str}"`;
            })
            .join(",")}]`;
    };
    const fileContent = `---
generation: ${GENERATION}
dexNumber: ${pokemon.dexNumber}
idName: "${pokemon.idName}"
baseId: "${pokemon.baseId}"
displayName: "${pokemon.displayName}"
rating: "${pokemon.rating}"
specialConditions: "${pokemon.specialConditions}"
tags: ${toArrayStr(pokemon.tags)}
---
  
Page was autogenerated. Check back later for content.

`;
    return fileContent;
};

const gens = new Generations(Dex, natdexFilter);
const ALL_POKEMON: any[] = Array.from(gens.get(GENERATION).species);

// console.dir(ALL_POKEMON, { maxArrayLength: null });

const parsedPokemon: Pokemon[] = [];

for (const specie of ALL_POKEMON) {
    const pokemon: Pokemon = {
        generation: GENERATION,
        dexNumber: specie.num,
        idName: specie.id,
        baseId: specie.baseSpecies,
        displayName: specie.name,
        rating: -2,
        specialConditions: specie.requiredItem || specie.requiredMove || "",
        tags: [],
    };
    if (specie.name === "Scizor") {
        pokemon.tags.push("shingo");
    }
    parsedPokemon.push(pokemon);
}

if (!fs.existsSync(POST_LOCATION_PREFIX)) {
    fs.mkdirSync(POST_LOCATION_PREFIX, { recursive: true });
}

for (const pokemon of parsedPokemon) {
    const fileDir = getFileDir(pokemon.idName);
    fs.writeFileSync(fileDir, getFileContent(pokemon), { flag: "w" });
    console.log("generate.tsx: created file " + fileDir);
}
