import React from "react";
import { withStyles, withThemeCreator } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { scale } from "chroma-js";

const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
		boxSizing: "border-box",
		cursor: "grab",
		"&:hover svg": {
			color: "white",
			transform: "scale(1.5)",
		},
	},
	boxContent: {
		width: "100%",
		padding: "10px",
		display: "flex",
		justifyContent: "space-between",
		boxSizing: "border-box",
		position: "absolute",
		left: "0",
		bottom: "0",
		color: "rgba(0,0,0,0.5)",
		fontSize: "12px",
		textTransform: "uppercase",
	},
	deleteIcon: {
		transition: "all 300ms ease-in-out",
	},
};

function DraggableColorBox(props) {
	const { classes } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: props.color }}>
			<div className={classes.boxContent}>
				<span>{props.name}</span>
				<DeleteIcon className={classes.deleteIcon} />
			</div>
		</div>
	);
}

export default withStyles(styles)(DraggableColorBox);
