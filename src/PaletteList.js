import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { blue, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MiniPalette from "./MiniPalette.js";
import styles from "./styles/PaletteListStyles.js";

function PaletteList(props) {
	const { classes, palettes } = props;
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
	const [paletteIdToDelete, setPaletteIdToDelete] = React.useState("");

	function goToPalette(id) {
		props.history.push(`/palette/${id}`);
	}

	function openDeleteDialog(id) {
		setIsDeleteDialogOpen(true);
		setPaletteIdToDelete(id);
	}

	function closeDeleteDialog() {
		setIsDeleteDialogOpen(false);
		setPaletteIdToDelete("");
	}

	function handleDeletePalette() {
		props.deletePalette(paletteIdToDelete);
		closeDeleteDialog();
	}

	return (
		<div className={classes.PaletteList}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1 className={classes.heading}>React Colors</h1>
					<Link to="/palette/new">Create New Palette</Link>
				</nav>
				<TransitionGroup className={classes.palettes}>
					{palettes.map((palette) => (
						<CSSTransition key={palette.id} classNames="fade" timeout={500}>
							<MiniPalette
								key={palette.id}
								{...palette}
								palettes={palettes}
								goToPalette={goToPalette}
								openDeleteDialog={openDeleteDialog}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			{/* Delete Confirmation */}
			<Dialog
				open={isDeleteDialogOpen}
				onClose={closeDeleteDialog}
				aria-labelledby="delete-dialog-title"
			>
				<DialogTitle id="delete-dialog-title">Are you Sure?</DialogTitle>
				<List>
					<ListItem button onClick={handleDeletePalette}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Delete</ListItemText>
					</ListItem>
					<ListItem button onClick={closeDeleteDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>Cancel</ListItemText>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}

export default withStyles(styles)(PaletteList);
