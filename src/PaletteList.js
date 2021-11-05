import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MiniPalette from "./MiniPalette.js";
import styles from "./styles/PaletteListStyles.js";

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDeleteDialogOpen: false,
			paletteIdToDelete: "",
		};

		this.openDeleteDialog = this.openDeleteDialog.bind(this);
		this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
		this.handleDeletePalette = this.handleDeletePalette.bind(this);
	}

	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	openDeleteDialog(id) {
		this.setState({ isDeleteDialogOpen: true, paletteIdToDelete: id });
	}

	closeDeleteDialog() {
		this.setState({ isDeleteDialogOpen: false, paletteIdToDelete: "" });
	}

	handleDeletePalette() {
		this.props.deletePalette(this.state.paletteIdToDelete);
		this.closeDeleteDialog();
	}

	render() {
		const { classes, palettes } = this.props;

		const { isDeleteDialogOpen } = this.state;

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
									goToPalette={() => this.goToPalette(palette.id)}
									openDeleteDialog={this.openDeleteDialog}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				{/* Delete Confirmation */}
				<Dialog
					open={isDeleteDialogOpen}
					onClose={this.closeDeleteDialog}
					aria-labelledby="delete-dialog-title"
				>
					<DialogTitle id="delete-dialog-title">Are you Sure?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDeletePalette}>
							<ListItemAvatar>
								<Avatar
									style={{ backgroundColor: blue[100], color: blue[600] }}
								>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.closeDeleteDialog}>
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
}

export default withStyles(styles)(PaletteList);
