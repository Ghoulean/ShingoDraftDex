import * as React from "react";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MoveTooltip } from "./move_tooltip";

export type AnalysisRendererProps = {
    children: any;
};

const shortcodes = {
    Link,
    MoveTooltip,
};
export const AnalysisRenderer = (props: AnalysisRendererProps) => {
    return (
        <MDXProvider components={shortcodes}>
            {props.children}
        </MDXProvider>
    );
};
