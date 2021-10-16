import React from "react";
import { withStyles } from "@mui/styles";

const styles = {
	MiniPalette: {
		padding: "0.5rem",
		position: "relative",
		backgroundColor: "#fff",
		border: "1px solid #000",
		borderRadius: "5px",
		overflow: "hidden",
		"&:hover": {
			cursor: "pointer",
		},
	},
	MiniPalette__colors: {
		width: "100%",
		height: "150px",
		backgroundColor: "#DAE1E4",
		borderRadius: "5px",
		overflow: "hidden",
	},
	MiniPalette__miniColorBox: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
	},
	MiniPalette__title: {
		margin: "0",
		paddingTop: "0.5rem",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		color: "black",
		fontSize: "1rem",
	},
	MiniPalette__emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem",
	},
};

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
