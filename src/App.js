import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Palette from "./Palette.js";
import seedColors from "./seedColors.js";
import { generatePalette } from "./colorHelpers.js";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" render={() => <h1>Palette List Goes Here</h1>} />
				<Route
					exact
					path="/palette/:id"
					render={() => <h1>Individual Palette</h1>}
				/>
			</Switch>

			// <div className="App">
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
