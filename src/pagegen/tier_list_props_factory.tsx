import path from "path";
import { GenerationNum } from "@pkmn/types";
import { PageProps, PagePropsFactory } from "./page_props_factory";

export type TierListPropContext = {
    generation: GenerationNum;
};

export class TierListPropsFactory extends PagePropsFactory {
    public async createPageProps(
        graphql: (query: string) => Promise<Object>
    ): Promise<PageProps[]> {
        return [
            {
                path: `pokemon/8`,
                component: path.join(
                    __dirname,
                    "..",
                    "templates",
                    "tier_list.tsx"
                ),
                context: {
                    generation: 8,
                },
            },
        ];
    }
}
