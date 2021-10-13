import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: "hex",
		};

		this.handleChangeFormat = this.handleChangeFormat.bind(this);
	}

	handleChangeFormat(evt) {
		this.setState({
			format: evt.target.value,
		});
		this.props.changeFormat(evt.target.value);
	}

	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;

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
				<div className="Navbar__select-container">
					<Select value={format} onChange={this.handleChangeFormat}>
						<MenuItem value="hex">HEX - #000000</MenuItem>
						<MenuItem value="rgb">RGB - rgb(0, 0, 0)</MenuItem>
						<MenuItem value="rgba">RBBA - rgba(0, 0, 0, 1.0)</MenuItem>
					</Select>
				</div>
			</nav>
		);
	}
}

export default Navbar;
