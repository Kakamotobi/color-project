import React, { Component } from "react";
import Navbar from "./Navbar.js";
import ColorBox from "./ColorBox.js";
import PaletteFooter from "./PaletteFooter.js";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);

		this.state = {
			format: "hex",
		};

		this.changeFormat = this.changeFormat.bind(this);
	}

	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.push(
				allColors[key].filter((color) => color.id === colorToFilterBy)
			);
		}
		return shades.slice(1);
	}

	changeFormat(value) {
		this.setState({ format: value });
	}

	render() {
		const { format } = this.state;
		const { paletteName, emoji } = this.props.palette;

		const colorBoxes = this._shades.map((color) => (
			<ColorBox
				key={color.id}
				name={color.name}
				background={color[format]}
				showLink={false}
			/>
		));

		return (
			<div className="Palette">
				<Navbar changeFormat={this.changeFormat} showingAllColors={false} />
				<div className="Palette__colors">{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default SingleColorPalette;
