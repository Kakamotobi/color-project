import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PaletteList from "./PaletteList.js";
import Palette from "./Palette.js";
import SingleColorPalette from "./SingleColorPalette.js";
import NewPaletteForm from "./NewPaletteForm.js";
import Page from "./Page.js";
import seedColors from "./seedColors.js";
import { generatePalette } from "./colorHelpers.js";

class App extends Component {
	constructor(props) {
		super(props);

		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

		this.state = {
			palettes: savedPalettes || seedColors,
		};

		this.findPalette = this.findPalette.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	// Find palette using the id passed in the URL
	findPalette(id) {
		return this.state.palettes.find((palette) => palette.id === id);
	}

	savePalette(newPalette) {
		this.setState(
			{ palettes: [...this.state.palettes, newPalette] },
			this.syncLocalStorage
		);
	}

	deletePalette(id) {
		this.setState(
			(prevState) => ({
				palettes: prevState.palettes.filter((palette) => palette.id !== id),
			}),
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	}

	render() {
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="page" timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												palettes={this.state.palettes}
												savePalette={this.savePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/"
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palettes}
												deletePalette={this.deletePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<Page>
											<Palette
												palette={generatePalette(
													this.findPalette(routeProps.match.params.id)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteId/:colorId"
									render={(routeProps) => (
										<Page>
											<SingleColorPalette
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteId)
												)}
												colorId={routeProps.match.params.colorId}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		);
	}
}

export default App;
