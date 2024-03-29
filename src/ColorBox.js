import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@mui/styles";
import styles from "./styles/ColorBoxStyles.js";

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
						className={`${classes.copyOverlay} ${
							copied && classes.showOverlay
						}`}
						style={{ background: background }}
					/>
					<div
						className={`${classes.copyMessage} ${
							copied && classes.showCopyMessage
						}`}
					>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
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
