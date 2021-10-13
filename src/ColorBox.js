import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

class ColorBox extends Component {
	render() {
		const { name, background } = this.props;

		return (
			<CopyToClipboard text={background}>
				<div className="ColorBox" style={{ background: background }}>
					<div className="ColorBox__copy-container">
						<div className="ColorBox__box-content">
							<span>{name}</span>
						</div>
						<button className="ColorBox__copy-btn">Copy</button>
					</div>
					<span className="ColorBox__see-more">More</span>
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
