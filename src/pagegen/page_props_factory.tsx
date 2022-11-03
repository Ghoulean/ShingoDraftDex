export type PageProps = {
    path: string
    component: string
    context: Object
}

export abstract class PagePropsFactory {
    public abstract createPageProps(graphql: (query: string) => Promise<Object>): Promise<PageProps[]>;
}
