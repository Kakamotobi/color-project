import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
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

	const {
		classes,
		open,
		drawerWidth,
		palettes,
		handleDrawerOpen,
		savePalette,
	} = props;

	return (
		<div className={classes.root}>
			{" "}
			<CssBaseline />
			<AppBar
				position="fixed"
				open={open}
				drawerWidth={drawerWidth}
				color="default"
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<AddToPhotosIcon />
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
					palettes={palettes}
					savePalette={savePalette}
					paletteMetaFormShowing={paletteMetaFormShowing}
					closePaletteMetaForm={closePaletteMetaForm}
				/>
			)}
		</div>
	);
}

export default withStyles(styles)(NewPaletteFormNav);
