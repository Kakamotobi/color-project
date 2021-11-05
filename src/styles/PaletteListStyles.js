import sizes from "./sizes.js";
import bg from "./bg.svg";

const styles = {
	PaletteList: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
		// background by SVGBackgrounds.com
		backgroundColor: "000344",
		backgroundImage: `url(${bg})`,
		overflowY: "scroll",
	},
	heading: {
		fontSize: "2rem",
	},
	container: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		flexWrap: "wrap",
		[sizes.down("xl")]: {
			width: "80%",
		},
		[sizes.down("xs")]: {
			width: "75%",
		},
	},
	nav: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		color: "#fff",
		"& a": {
			color: "#fff",
		},
	},
	palettes: {
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "2.5rem",
		boxSizing: "border-box",
		[sizes.down("md")]: {
			gridTemplateColumns: "repeat(2, 50%)",
		},
		[sizes.down("xs")]: {
			gridTemplateColumns: "repeat(1, 100%)",
			gridGap: "1.4rem",
		},
	},
	// "@global" prevents prefix
	"@global": {
		".fade-exit": {
			opacity: 1,
		},
		".fade-exit-active": {
			opacity: 0,
			transition: "opacity 500ms ease-out",
		},
	},
};

export default styles;
