import React from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles/MiniPaletteStyles.js";

function MiniPalette(props) {
	const { classes, paletteName, colors, emoji, goToPalette } = props;
	const miniColorBoxes = colors.map((color) => (
		<div
			className={classes.MiniPalette__miniColorBox}
			style={{ backgroundColor: color.color }}
			key={color.name}
		></div>
	));

	return (
		<div className={classes.MiniPalette} onClick={goToPalette}>
			<div className={classes.MiniPalette__colors}>{miniColorBoxes}</div>
			<h5 className={classes.MiniPalette__title}>
				{paletteName}{" "}
				<span className={classes.MiniPalette__emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
