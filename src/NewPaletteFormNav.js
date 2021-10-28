import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import PaletteMetaForm from "./PaletteMetaForm.js";

const styles = {
	root: {
		display: "flex",
	},
	navBtns: {},
};

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerWidth }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	height: "64px",
	flexDirection: "row",
	justifyContent: "space-between",
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

// NewPaletteFormNav Component
function NewPaletteFormNav(props) {
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
					<PaletteMetaForm
						palettes={props.palettes}
						savePalette={props.savePalette}
					/>
					<Link to="/">
						<Button variant="contained" color="secondary">
							Go Back
						</Button>
					</Link>
				</div>
			</AppBar>
		</div>
	);
}

export default withStyles(styles)(NewPaletteFormNav);
