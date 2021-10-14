import React, { Component } from "react";
import MiniPalette from "./MiniPalette.js";
import { Link } from "react-router-dom";

class PaletteList extends Component {
	render() {
		const { palettes } = this.props;

		return (
			<div className="PaletteList">
        <MiniPalette />
				{palettes.map((palette) => (
					<p>
						<Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
					</p>
				))}
			</div>
		);
	}
}

export default PaletteList;
