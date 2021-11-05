const styles = {
	MiniPalette: {
		padding: "0.5rem",
		position: "relative",
		backgroundColor: "#fff",
		border: "1px solid #000",
		borderRadius: "5px",
		cursor: "pointer",
		"&:hover svg": {
			opacity: "1",
		},
	},
	colors: {
		width: "100%",
		height: "150px",
		backgroundColor: "#DAE1E4",
		borderRadius: "5px",
		overflow: "hidden",
	},
	miniColorBox: {
		width: "20%",
		height: "25%",
		margin: "0 auto",
		marginBottom: "-3.5px",
		display: "inline-block",
		position: "relative",
	},
	title: {
		margin: "0",
		paddingTop: "0.5rem",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		color: "black",
		fontSize: "1rem",
	},
	emoji: {
		marginLeft: "0.5rem",
		fontSize: "1.5rem",
	},
	deleteIcon: {
		width: "20px",
		height: "20px",
		padding: "10px",
		position: "absolute",
		right: "0",
		top: "0",
		backgroundColor: "#eb3d30",
		borderTopRightRadius: "5px",
		borderBottomLeftRadius: "5px",
		color: "white",
		zIndex: "10",
		opacity: "0",
	},
};

export default styles;
