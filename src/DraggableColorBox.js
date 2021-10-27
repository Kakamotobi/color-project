import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		marginBottom: "-7px",
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
		cursor: "pointer",
		transition: "all 300ms ease-in-out",
	},
};

const DraggableColorBox = SortableElement((props) => {
	const { classes, color, name, removeColor } = props;

	const handleRemoveColor = () => {
		removeColor(name);
	};

	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon
					className={classes.deleteIcon}
					onClick={handleRemoveColor}
				/>
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
