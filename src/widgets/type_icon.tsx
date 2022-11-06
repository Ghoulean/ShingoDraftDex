import * as React from "react";
import { Icons } from "@pkmn/img";
import { TypeName } from "@pkmn/types";

export type TypeIconProps = {
    typeName: TypeName;
};

export const TypeIcon = (props: TypeIconProps) => {
    // TODO: rehost images
    const { url } = Icons.getType(props.typeName, {});
    return <img src={url}></img>;
};
