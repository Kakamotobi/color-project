import chroma from "chroma-js";

const styles = {
	ColorBox: {
		width: "20%",
		height: (props) => (props.showingFullPalette ? "25%" : "50%"),
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
		boxSizing: "border-box",
		cursor: "pointer",
		"&:hover button": {
			opacity: 1,
			transition: "500ms",
		},
	},
	copyText: {
		color: (props) =>
			chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
	},
	colorName: {
		color: (props) =>
			chroma(props.background).luminance() <= 0.08
				? "white"
				: "rgba(0,0,0,0.5)",
	},
	boxContent: {
		width: "100%",
		padding: "10px",
		boxSizing: "border-box",
		position: "absolute",
		left: "0",
		bottom: "0",
		color: "black",
		fontSize: "12px",
		textTransform: "uppercase",
	},
	copyButton: {
		color: (props) =>
			chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
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
		fontSize: "1rem",
		textDecoration: "none",
		textAlign: "center",
		lineHeight: "30px",
		textTransform: "uppercase",
		cursor: "pointer",
		opacity: 0,
	},
	seeMore: {
		color: (props) =>
			chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
		width: "60px",
		height: "30px",
		position: "absolute",
		right: "0",
		bottom: "0",
		background: "rgba(255, 255, 255, 0.3)",
		border: "none",
		textAlign: "center",
		lineHeight: "30px",
		textTransform: "uppercase",
	},
	copyOverlay: {
		width: "100%",
		height: "100%",
		opacity: "0",
		zIndex: "50",
		transform: "scale(0.1)",
	},
	showOverlay: {
		position: "absolute",
		opacity: "1",
		zIndex: "10",
		transform: "scale(10)",
		transition: "all 600ms ease-in-out",
	},
	copyMessage: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		position: "fixed",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		color: "white",
		fontSize: "4rem",
		opacity: "0",
		transform: "scale(0.1)",
		"& h1": {
			width: "100%",
			marginBottom: "0",
			padding: "1rem",
			background: "rgba(255, 255, 255, 0.3)",
			fontWeight: "400",
			textAlign: "center",
			textShadow: "1px 2px black",
			textTransform: "uppercase",
		},
		"& p": {
			fontSize: "2rem",
			fontWeight: "100",
		},
	},
	showCopyMessage: {
		opacity: "1",
		zIndex: "25",
		transform: "scale(1)",
		transition: "all 400ms ease-in-out 300ms",
	},
};

export default styles;
