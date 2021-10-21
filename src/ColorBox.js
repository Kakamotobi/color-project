import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./ColorBox.css";

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
		const { name, background, moreUrl, showLink } = this.props;
		const { copied } = this.state;

		const isDarkColor = chroma(background).luminance() <= 0.08;
		const isLightColor = chroma(background).luminance() >= 0.7;

		return (
			<CopyToClipboard text={background}>
				<div
					className="ColorBox"
					style={{ background: background }}
					onClick={this.changeCopyState}
				>
					<div
						className={`ColorBox__copy-overlay ${copied && "show"}`}
						style={{ background: background }}
					/>
					<div className={`ColorBox__copy-msg ${copied && "show"}`}>
						<h1>Copied!</h1>
						<p className={isLightColor && "dark-text"}>{background}</p>
					</div>
					<div className="ColorBox__copy-container">
						<div className="ColorBox__box-content">
							<span className={isDarkColor && "light-text"}>{name}</span>
						</div>
						<button
							className={`ColorBox__copy-btn ${isLightColor && "dark-text"}`}
						>
							Copy
						</button>
					</div>

					{showLink && (
						<Link to={moreUrl} onClick={(evt) => evt.stopPropagation}>
							<span
								className={`ColorBox__see-more ${isLightColor && "dark-text"}`}
							>
								MORE
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
