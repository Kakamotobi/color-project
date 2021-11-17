import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/MiniPaletteStyles.js";

const MiniPalette = React.memo(
	(props) => {
		const {
			classes,
			paletteName,
			id,
			colors,
			emoji,
			goToPalette,
			openDeleteDialog,
		} = props;

		const handleGoToPalette = () => {
			goToPalette(id);
		};

		const handleOpenDeleteDialog = React.useCallback(
			(evt) => {
				evt.stopPropagation();
				openDeleteDialog(id);
			},
			[id, openDeleteDialog]
		);

		const miniColorBoxes = colors.map((color) => (
			<div
				className={classes.miniColorBox}
				style={{ backgroundColor: color.color }}
				key={color.name}
			></div>
		));

		return (
			<div className={classes.MiniPalette} onClick={handleGoToPalette}>
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
	},
	(prevProps, nextProps) => {
		if (prevProps !== nextProps) {
			return true;
		}
		return false;
	}
);

export default withStyles(styles)(MiniPalette);
