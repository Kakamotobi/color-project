import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm.js";
import PaletteList from "./PaletteList.js";
import Palette from "./Palette.js";
import SingleColorPalette from "./SingleColorPalette.js";
import seedColors from "./seedColors.js";
import { generatePalette } from "./colorHelpers.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

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

	// Find starter palette using the id passed in the URL
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
						<CSSTransition key={location.key} classNames="fade" timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<div className="page">
											<NewPaletteForm
												palettes={this.state.palettes}
												savePalette={this.savePalette}
												{...routeProps}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/"
									render={(routeProps) => (
										<div className="page">
											<PaletteList
												palettes={this.state.palettes}
												deletePalette={this.deletePalette}
												{...routeProps}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<div className="page">
											<Palette
												palette={generatePalette(
													this.findPalette(routeProps.match.params.id)
												)}
											/>
										</div>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteId/:colorId"
									render={(routeProps) => (
										<div className="page">
											<SingleColorPalette
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteId)
												)}
												colorId={routeProps.match.params.colorId}
											/>
										</div>
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
