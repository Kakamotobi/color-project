import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component {
	render() {
		const { level, changeLevel } = this.props;

		return (
			<nav className="Navbar">
				<div className="Navbar__logo">
					<a href="#">reactcolorpicker</a>
				</div>
				<div className="Navbar__slider-container">
					<span>Level: {level}</span>
					<div className="Navbar__slider">
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
