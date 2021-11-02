import sizes from "./sizes.js";

const styles = {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	colors: {
		height: "90%",
	},
	goBack: {
		width: "20%",
		height: "50%",
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
		backgroundColor: "black",
		boxSizing: "border-box",
		opacity: "1",
		"& a": {
			width: "100px",
			height: "30px",
			marginLeft: "-50px",
			marginTop: "-15px",
			display: "inline-block",
			position: "absolute",
			top: "50%",
			left: "50%",
			background: "rgba(255, 255, 255, 0.3)",
			border: "none",
			outline: "none",
			color: "white",
			fontSize: "1rem",
			textDecoration: "none",
			textAlign: "center",
			lineHeight: "30px",
			textTransform: "uppercase",
			cursor: "pointer",
		},
		[sizes.down("lg")]: {
			width: "25%",
			height: "33.33%",
		},
		[sizes.down("md")]: {
			width: "50%",
			height: "20%",
		},
		[sizes.down("xs")]: {
			width: "100%",
			height: "10%",
		},
	},
};

export default styles;
