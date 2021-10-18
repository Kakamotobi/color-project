import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PaletteList from "./PaletteList.js";
import Palette from "./Palette.js";
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
				{/* Pass through all of the palettes to PaletteList */}
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
					render={() => <h1>Single Color Page</h1>}
				/>
			</Switch>

			// <div className="App">
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
