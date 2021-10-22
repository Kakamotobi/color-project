import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm.js";
import PaletteList from "./PaletteList.js";
import Palette from "./Palette.js";
import SingleColorPalette from "./SingleColorPalette.js";
import seedColors from "./seedColors.js";
import { generatePalette } from "./colorHelpers.js";

class App extends Component {
	// Find starter palette using the id passed in the URL
	findStarterPalette(id) {
		return seedColors.find((palette) => palette.id === id);
	}

	render() {
		return (
			<Switch>
				<Route exact path="/palette/new" render={() => <NewPaletteForm />} />
				<Route
					exact
					path="/"
					render={(routeProps) => (
						<PaletteList palettes={seedColors} {...routeProps} />
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette
							palette={generatePalette(
								this.findStarterPalette(routeProps.match.params.id)
							)}
						/>
					)}
				/>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routeProps) => (
						<SingleColorPalette
							palette={generatePalette(
								this.findStarterPalette(routeProps.match.params.paletteId)
							)}
							colorId={routeProps.match.params.colorId}
						/>
					)}
				/>
			</Switch>

			// <div className="App">
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
