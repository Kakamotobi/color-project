import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/DraggableColorBoxStyles.js";

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
