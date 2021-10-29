import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import PaletteMetaForm from "./PaletteMetaForm.js";
import { styles, AppBar } from "./styles/NewPaletteFormNavStyles.js";

// NewPaletteFormNav Component
function NewPaletteFormNav(props) {
	const [paletteMetaFormShowing, togglePaletteMetaFormShowing] =
		React.useState(false);

	const showPaletteMetaForm = () => {
		togglePaletteMetaFormShowing(true);
	};

	const closePaletteMetaForm = () => {
		togglePaletteMetaFormShowing(false);
	};

	const { classes } = props;

	return (
		<div className={classes.root}>
			{" "}
			<CssBaseline />
			<AppBar
				position="fixed"
				open={props.open}
				drawerWidth={props.drawerWidth}
				color="default"
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={props.handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(props.open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to="/">
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
						>
							Go Back
						</Button>
					</Link>
					<Button
						className={classes.button}
						variant="contained"
						onClick={showPaletteMetaForm}
					>
						Save{" "}
					</Button>
				</div>
			</AppBar>
			{paletteMetaFormShowing && (
				<PaletteMetaForm
					palettes={props.palettes}
					savePalette={props.savePalette}
					paletteMetaFormShowing={paletteMetaFormShowing}
					closePaletteMetaForm={closePaletteMetaForm}
				/>
			)}
		</div>
	);
}

export default withStyles(styles)(NewPaletteFormNav);
