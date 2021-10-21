import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Navbar from "./Navbar.js";
import ColorBox from "./ColorBox.js";
import PaletteFooter from "./PaletteFooter.js";
import "./Palette.css";

const styles = {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	colors: {
		height: "90%",
	},
};

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 500,
			format: "hex",
		};

		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}

	changeLevel(newLevel) {
		this.setState({ level: newLevel });
	}

	changeFormat(value) {
		this.setState({ format: value });
	}

	render() {
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const { level, format } = this.state;

		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				key={color.id}
				background={color[format]}
				name={color.name}
				moreUrl={`/palette/${id}/${color.id}`}
				showingFullPalette={true}
			/>
		));

		return (
			<div className={classes.Palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					changeFormat={this.changeFormat}
					showingAllColors={true}
				/>

				<div className={classes.colors}>{colorBoxes}</div>

				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
