import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteMetaForm(props) {
	const [open, setOpen] = React.useState(false);
	const [newPaletteName, updatePaletteName] = React.useState("");

	const handleChange = (evt) => {
		updatePaletteName(evt.target.value);
	};

	const handleSavePalette = () => {
		props.savePalette(newPaletteName);
	};

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
			return props.palettes.every(
				(palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	});

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Choose a Palette Name</DialogTitle>
			<ValidatorForm onSubmit={handleSavePalette}>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your new palette. Make sure it's unique!
					</DialogContentText>
					<TextValidator
						label="Palette Name"
						name="newPaletteName"
						value={newPaletteName}
						onChange={handleChange}
						validators={["required", "isPaletteNameUnique"]}
						errorMessages={["Enter palette name", "Name already used"]}
						fullWidth
						margin="normal"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" variant="contained" color="primary">
						Save Palette
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
	);
}

export default PaletteMetaForm;
