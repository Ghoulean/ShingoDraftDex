import * as React from "react";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

export type AnalysisRendererProps = {
    children: any;
};

const shortcodes = {
    Link,
};
export const AnalysisRenderer = (props: AnalysisRendererProps) => {
    return <MDXProvider components={shortcodes}>{props.children}</MDXProvider>;
};
