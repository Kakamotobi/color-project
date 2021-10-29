import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const styles = {
	root: {
		display: "flex",
	},
	navBtns: {
		marginRight: "1rem",
		"& a": {
			textDecoration: "none",
		},
	},
	button: {
		margin: "0 0.5rem !important",
	},
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
	alignItems: "center",
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export { styles, AppBar };
