import React, { Component } from "react";
import MiniPalette from "./MiniPalette.js";
import { Link } from "react-router-dom";

class PaletteList extends Component {
	render() {
		const { palettes } = this.props;

		return (
			<div className="PaletteList">
				{palettes.map((palette) => (
					<MiniPalette {...palette} />
				))}
			</div>
		);
	}
}

export default PaletteList;
