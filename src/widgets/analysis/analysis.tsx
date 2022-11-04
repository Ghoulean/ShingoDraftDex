import React from "react";
import { Pokemon } from "../../models/Pokemon";
import { AnalysisTab } from "./analysis_tab";
import { AnalysisRenderer } from "./analysis_renderer";
import { GenerationNum } from "@pkmn/types";
import styled from "@emotion/styled";

const Centered = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});
const Tabholder = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "10px 0 0",
});

type AnalysisProps = {
    generation: GenerationNum;
    orderedPokemonList: string[];
    pokemonToMarkdownBodyMap: {
        [pokemonDisplayName: string]: {
            pokemon: Pokemon;
            rawMarkdownBody: string;
        };
    };
};

type AnalysisState = {
    currentTab: string;
};

export class Analysis extends React.Component<AnalysisProps, AnalysisState> {
    private readonly generation: GenerationNum;
    private readonly bodies: {
        [key: string]: string;
    };
    private readonly orderedPokemonList: string[];

    constructor(props: AnalysisProps) {
        super(props);
        this.generation = props.generation;
        this.bodies = {};
        this.orderedPokemonList = props.orderedPokemonList;
        props.orderedPokemonList.forEach((pokemonDisplayName: string) => {
            this.bodies[pokemonDisplayName] =
                props.pokemonToMarkdownBodyMap[
                    pokemonDisplayName
                ]!.rawMarkdownBody;
        });
        this.state = {
            currentTab: props.orderedPokemonList[0],
        };
        this.changeTab.bind(this);
    }

    changeTab = (id: string) => {
        this.setState({ currentTab: id });
    };

    render() {
        return (
            <Centered>
                <Tabholder>
                    {this.orderedPokemonList.map((pokemonName, i) => {
                        return (
                            <AnalysisTab
                                key={i}
                                generation={this.generation}
                                pokemonName={pokemonName}
                                isActive={this.state.currentTab === pokemonName}
                                callback={() => {
                                    this.changeTab(pokemonName);
                                }}
                            />
                        );
                    })}
                </Tabholder>
                <AnalysisRenderer>
                    {this.bodies[this.state.currentTab]}
                </AnalysisRenderer>
            </Centered>
        );
    }
}
