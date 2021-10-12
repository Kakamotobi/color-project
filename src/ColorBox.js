import React, { Component } from "react";
import "./ColorBox.css";

class ColorBox extends Component {
	render() {
		const { name, background } = this.props;

		return (
			<div className="ColorBox" style={{ background: background }}>
				<div className="ColorBox__copy-container">
					<div className="ColorBox__box-content">
						<span>{name}</span>
					</div>
					<button className="ColorBox__copy-btn">Copy</button>
				</div>
				<span className="ColorBox__see-more">More</span>
			</div>
		);
	}
}

export default ColorBox;
