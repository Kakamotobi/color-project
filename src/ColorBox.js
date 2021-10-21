import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@mui/styles";
import "./ColorBox.css";

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
		color: "white",
		textAlign: "center",
		lineHeight: "30px",
		textTransform: "uppercase",
	},
};

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false,
		};

		this.changeCopyState = this.changeCopyState.bind(this);
	}

	changeCopyState() {
		this.setState(
			{
				copied: true,
			},
			() => {
				setTimeout(() => this.setState({ copied: false }), 1500);
			}
		);
	}

	render() {
		const { name, background, moreUrl, showingFullPalette, classes } =
			this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background}>
				<div
					className={classes.ColorBox}
					style={{ background: background }}
					onClick={this.changeCopyState}
				>
					<div
						className={`ColorBox__copy-overlay ${copied && "show"}`}
						style={{ background: background }}
					/>
					<div className={`ColorBox__copy-msg ${copied && "show"}`}>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div className="ColorBox__copy-container">
						<div className="ColorBox__box-content">
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>

					{showingFullPalette && (
						<Link to={moreUrl} onClick={(evt) => evt.stopPropagation}>
							<span className={classes.seeMore}>MORE</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
