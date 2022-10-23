import * as React from "react";

export type MovesetHolderProps = {
    rawMovesetStr: string;
};

export const MovesetHolder = (props: MovesetHolderProps) => {
    return <span>{props.rawMovesetStr}</span>;
};
