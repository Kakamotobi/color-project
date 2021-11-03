import sizes from "./sizes.js";

const styles = {
	Navbar: {
		height: "6vh",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	logo: {
		height: "100%",
		marginRight: "15px",
		padding: "0 13px",
		display: "flex",
		alignItems: "center",
		backgroundColor: "#eceff1",
		fontSize: "22px",
		fontFamily: "Roboto",
		"& a": {
			color: "#000",
			textDecoration: "none",
		},
		[sizes.down("xs")]: {
			display: "none",
		},
	},
	slider: {
		width: "340px",
		margin: "0 10px",
		display: "inline-block",
		"& .rc-slider-track": {
			backgroundColor: "transparent",
		},
		"& .rc-slider-rail": {
			height: "8px",
		},
		"& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover":
			{
				width: "13px",
				height: "13px",
				marginTop: "-3px",
				marginLeft: "-7px",
				backgroundColor: "green",
				border: "2px solid green",
				boxShadow: "none",
				outline: "none",
			},
		[sizes.down("md")]: {
			width: "150px",
		},
	},
	selectContainer: {
		marginLeft: "auto",
		marginRight: "1rem",
	},
};

export default styles;
