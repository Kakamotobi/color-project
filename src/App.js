import React, { Component } from "react";
import Palette from "./Palette.js";
import seedColors from "./seedColors.js";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Palette {...seedColors[4]} />
			</div>
		);
	}
}

export default App;
