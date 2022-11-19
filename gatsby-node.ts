import type { GatsbyNode } from "gatsby";
import { PokemonArticlePropsFactory } from "./src/pagegen/pokemon_article_props_factory";
import { TierListPropsFactory } from "./src/pagegen/tier_list_props_factory";
import { PageProps } from "./src/pagegen/page_props_factory";

export const createPages: GatsbyNode["createPages"] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;

    const pokemonArticlePropsFactory: PokemonArticlePropsFactory =
        new PokemonArticlePropsFactory();
    const pokemonArticlePageProps: PageProps[] =
        await pokemonArticlePropsFactory.createPageProps(graphql);
    pokemonArticlePageProps.forEach((prop) => {
        createPage(prop);
    });

    const tierListPropsFactory: TierListPropsFactory =
        new TierListPropsFactory();
    const tierListPropsFactoryProps: PageProps[] =
        await tierListPropsFactory.createPageProps(graphql);
    tierListPropsFactoryProps.forEach((prop) => {
        createPage(prop);
    });
};
