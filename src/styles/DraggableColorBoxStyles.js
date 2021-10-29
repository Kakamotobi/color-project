const styles = {
	root: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		marginBottom: "-7px",
		display: "inline-block",
		position: "relative",
		boxSizing: "border-box",
		cursor: "grab",
		"&:hover svg": {
			color: "white",
			transform: "scale(1.5)",
		},
	},
	boxContent: {
		width: "100%",
		padding: "10px",
		display: "flex",
		justifyContent: "space-between",
		boxSizing: "border-box",
		position: "absolute",
		left: "0",
		bottom: "0",
		color: "rgba(0,0,0,0.5)",
		fontSize: "12px",
		textTransform: "uppercase",
	},
	deleteIcon: {
		cursor: "pointer",
		transition: "all 300ms ease-in-out",
	},
};

export default styles;
