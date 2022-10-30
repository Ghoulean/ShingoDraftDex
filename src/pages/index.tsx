import * as React from "react";
import { Link } from "gatsby";

const IndexPage = () => {
    return (
        <>
            <title>Shingo Draft Dex</title>
            <p>Site under construction</p>
            <Link to={"/pokemon/8"}>Link to gen 8</Link>
        </>
    );
};

export default IndexPage;
