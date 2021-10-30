import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import MiniPalette from "./MiniPalette.js";
import styles from "./styles/PaletteListStyles.js";

class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { classes, palettes, deletePalette } = this.props;

		return (
			<div className={classes.PaletteList}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">Create New Palette</Link>
					</nav>
					<div className={classes.palettes}>
						{palettes.map((palette) => (
							<MiniPalette
								key={palette.id}
								{...palette}
								palettes={palettes}
								goToPalette={() => this.goToPalette(palette.id)}
								deletePalette={deletePalette}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
