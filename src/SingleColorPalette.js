import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Navbar from "./Navbar.js";
import ColorBox from "./ColorBox.js";
import PaletteFooter from "./PaletteFooter.js";

const styles = {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	colors: {
		height: "90%",
	},
	goBack: {
		width: "20%",
		height: "50%",
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
		backgroundColor: "black",
		boxSizing: "border-box",
		opacity: "1",
		"& a": {
			width: "100px",
			height: "30px",
			marginLeft: "-50px",
			marginTop: "-15px",
			display: "inline-block",
			position: "absolute",
			top: "50%",
			left: "50%",
			background: "rgba(255, 255, 255, 0.3)",
			border: "none",
			outline: "none",
			color: "white",
			fontSize: "1rem",
			textDecoration: "none",
			textAlign: "center",
			lineHeight: "30px",
			textTransform: "uppercase",
			cursor: "pointer",
		},
	},
};

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
			shades = shades.concat(
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
		const { id, paletteName, emoji } = this.props.palette;
		const { classes } = this.props;

		const colorBoxes = this._shades.map((color) => (
			<ColorBox
				key={color.name}
				name={color.name}
				background={color[format]}
				showingFullPalette={false}
			/>
		));

		return (
			<div className={classes.Palette}>
				<Navbar changeFormat={this.changeFormat} showingAllColors={false} />
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>Go Back</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
