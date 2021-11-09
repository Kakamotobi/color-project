import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles.js";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: "hex",
			open: false,
		};

		this.handleChangeFormat = this.handleChangeFormat.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	handleChangeFormat(evt) {
		this.setState({
			format: evt.target.value,
			open: true,
		});
		this.props.changeFormat(evt.target.value);
	}

	closeSnackbar() {
		this.setState({
			open: false,
		});
	}

	render() {
		const { level, changeLevel, showingAllColors, classes } = this.props;
		const { format, open } = this.state;

		return (
			<nav className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">reactcolorpicker</Link>
				</div>
				{showingAllColors && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step={100}
								onAfterChange={changeLevel}
							/>
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleChangeFormat}>
						<MenuItem value="hex">HEX - #000000</MenuItem>
						<MenuItem value="rgb">RGB - rgb(0, 0, 0)</MenuItem>
						<MenuItem value="rgba">RBBA - rgba(0, 0, 0, 1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={open}
					autoHideDuration={3000}
					message={
						<span id="message-id">
							Changed Format To {format.toUpperCase()}
						</span>
					}
					ContentProps={{
						"aria-describedby": "message-id",
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton
							onClick={this.closeSnackbar}
							color="inherit"
							key="close"
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</nav>
		);
	}
}

export default withStyles(styles)(Navbar);
