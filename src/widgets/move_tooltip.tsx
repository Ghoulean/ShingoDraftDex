import React from "react";
import { Move } from "@pkmn/dex-types";
import { GenerationNum } from "@pkmn/types";
import { Natdex } from "../utils/natdex";
import { TypeIcon } from "./type_icon";

export type MoveTooltipProps = {
    gen: GenerationNum,
    moveName: string
};

export const MoveTooltip = (props: MoveTooltipProps) => {
    const move: Move = Natdex.get(props.gen).moves.get(props.moveName)!;
    return (<span>
        {move.fullname}
        {move.desc}
        <TypeIcon typeName={move.type}/>
    </span>);
};
