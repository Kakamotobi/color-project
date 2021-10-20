import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
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

		return (
			<CopyToClipboard text={background} onClick={this.changeCopyState}>
				<div className="ColorBox" style={{ background: background }}>
					<div
						className={`ColorBox__copy-overlay ${copied && "show"}}`}
						style={{ background: background }}
					></div>
					<div className={`ColorBox__copy-msg ${copied && "show"}`}>
						<h1>Copied!</h1>
						<p>{background}</p>
					</div>
					<div className="ColorBox__copy-container">
						<div className="ColorBox__box-content">
							<span>{name}</span>
						</div>
						<button className="ColorBox__copy-btn">Copy</button>
					</div>

					{showLink && (
						<Link to={moreUrl} onClick={(evt) => evt.stopPropagation}>
							<span className="ColorBox__see-more">More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
