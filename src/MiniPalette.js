import React from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles/MiniPaletteStyles.js";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette(props) {
	const {
		classes,
		paletteName,
		id,
		colors,
		emoji,
		palettes,
		goToPalette,
		openDeleteDialog,
	} = props;

	const handleOpenDeleteDialog = React.useCallback(
		(evt) => {
			evt.stopPropagation();
			openDeleteDialog(id);
		},
		[palettes]
	);

	const miniColorBoxes = colors.map((color) => (
		<div
			className={classes.miniColorBox}
			style={{ backgroundColor: color.color }}
			key={color.name}
		></div>
	));

	return (
		<div className={classes.MiniPalette} onClick={goToPalette}>
			<DeleteIcon
				className={classes.deleteIcon}
				sx={{ transition: "all 300ms ease-in-out" }}
				onClick={handleOpenDeleteDialog}
			/>
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
