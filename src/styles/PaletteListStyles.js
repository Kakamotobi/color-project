const styles = {
	PaletteList: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "blue",
	},
	PaletteList__container: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		flexWrap: "flex-wrap",
	},
	PaletteList__header: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		color: "#fff",
	},
	PaletteList__palettes: {
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "5%",
		boxSizing: "border-box",
	},
};

export default styles;
