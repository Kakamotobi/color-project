import React, { Component } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currColor: "teal",
			newColorName: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.updateCurrColor = this.updateCurrColor.bind(this);
		this.handleAddNewColor = this.handleAddNewColor.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	updateCurrColor(newColor) {
		this.setState({ currColor: newColor.hex });
	}

	handleAddNewColor() {
		const newColor = {
			color: this.state.currColor,
			name: this.state.newColorName,
		};
		this.props.addNewColor(newColor);
		this.setState({ newColorName: "" });
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorUnique", () => {
			return this.props.colors.every(
				(color) => color.color !== this.state.currColor
			);
		});
		ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
			return this.props.colors.every(
				(color) => color.name.toLowerCase() !== value.toLowerCase()
			);
		});
	}

	render() {
		const { paletteIsFull } = this.props;
		const { currColor, newColorName } = this.state;

		return (
			<div>
				<ChromePicker
					color={currColor}
					onChangeComplete={this.updateCurrColor}
				/>
				<ValidatorForm onSubmit={this.handleAddNewColor}>
					<TextValidator
						name="newColorName"
						value={newColorName}
						onChange={this.handleChange}
						validators={["required", "isColorUnique", "isColorNameUnique"]}
						errorMessages={[
							"Enter a color name",
							"Color already used",
							"Color name must be unique",
						]}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{ backgroundColor: paletteIsFull ? "grey" : currColor }}
						disabled={paletteIsFull}
					>
						{paletteIsFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
