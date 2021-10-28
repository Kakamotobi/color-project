import React, { Component } from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class NewPaletteFormNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			AppBar,
			open,
			newPaletteName,
			handleDrawerOpen,
			handleSavePalette,
			handleChange,
		} = this.props;

		return (
			<div>
				{" "}
				<CssBaseline />
				<AppBar position="fixed" open={open} color="default">
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={handleSavePalette}>
							<TextValidator
								label="Palette Name"
								name="newPaletteName"
								value={newPaletteName}
								onChange={handleChange}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={["Enter palette name", "Name already used"]}
							/>
							<Button type="submit" variant="contained" color="primary">
								Save Palette
							</Button>
						</ValidatorForm>
						<Link to="/">
							<Button variant="contained" color="secondary">
								Go Back
							</Button>
						</Link>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NewPaletteFormNav;
