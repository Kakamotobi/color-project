import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	picker: {
		width: "100% !important",
		marginTop: "2rem",
	},
	colorNameForm: {
		width: "100%",
	},
	colorNameInput: {
		width: "100%",
		marginTop: "16px !important",
		marginBottom: "8px !important",
	},
	addColorBtn: {
		width: "100%",
		marginTop: "1rem !important",
		padding: "1rem !important",
		fontSize: "1.5rem !important",
	},
};

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
		const { classes, paletteIsFull } = this.props;
		const { currColor, newColorName } = this.state;

		return (
			<div className={classes.root}>
				<ChromePicker
					className={classes.picker}
					color={currColor}
					onChangeComplete={this.updateCurrColor}
				/>
				<ValidatorForm
					className={classes.colorNameForm}
					onSubmit={this.handleAddNewColor}
				>
					<TextValidator
						className={classes.colorNameInput}
						variant="filled"
						placeholder="Color Name"
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
						className={classes.addColorBtn}
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

export default withStyles(styles)(ColorPickerForm);
