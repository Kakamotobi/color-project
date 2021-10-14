import React from "react";
import { withStyles } from "@mui/styles";

const styles = {
	main: {
		backgroundColor: "purple",
		border: "3px solid teal",
	},
	secondary: {
		backgroundColor: "pink",
		"& h1": {
			color: "white",
			"& span": {
				backgroundColor: "yellow",
			},
		},
	},
};

function MiniPalette(props) {
	const { classes } = props;

	return (
		<div className={`MiniPalette ${classes.main}`}>
			<h1>MiniPalette</h1>
			<section className={classes.secondary}>
				<h1>
					Mini Palette <span>blah</span>
				</h1>
				<span>blahblah</span>
			</section>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
