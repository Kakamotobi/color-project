import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import MiniPalette from "./MiniPalette.js";
import styles from "./styles/PaletteListStyles.js";

class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { classes, palettes } = this.props;

		return (
			<div className={classes.PaletteList}>
				<div className={classes.container}>
					<nav className={classes.header}>
						<h1>React Colors</h1>
					</nav>
					<div className={classes.palettes}>
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
