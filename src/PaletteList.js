import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import MiniPalette from "./MiniPalette.js";

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

class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { classes, palettes } = this.props;

		return (
			<div className={classes.PaletteList}>
				<div className={classes.PaletteList__container}>
					<nav className={classes.PaletteList__header}>
						<h1>React Colors</h1>
					</nav>
					<div className={classes.PaletteList__palettes}>
						{palettes.map((palette) => (
							<MiniPalette
								{...palette}
								goToPalette={() => this.goToPalette(palette.id)}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
