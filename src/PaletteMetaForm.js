import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function PaletteMetaForm(props) {
	const [dialogStage, setDialogStage] = React.useState("paletteNameForm");
	const [newPaletteName, updatePaletteName] = React.useState("");

	const handleChange = (evt) => {
		updatePaletteName(evt.target.value);
	};

	const changeDialogStage = () => {
		setDialogStage("emoji");
	};

	const handleSavePalette = (emojiObject) => {
		const newPalette = {
			paletteName: newPaletteName,
			emoji: emojiObject.native,
		};
		props.savePalette(newPalette);
		setDialogStage("");
	};

	const handleClosePaletteMetaForm = () => {
		props.closePaletteMetaForm();
	};

	React.useEffect(() => {
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
			return props.palettes.every(
				(palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	});

	return (
		<div>
			<Dialog
				open={dialogStage === "emoji"}
				onClose={handleClosePaletteMetaForm}
			>
				<DialogTitle>Choose a Palette Emoji</DialogTitle>
				<Picker onSelect={handleSavePalette} />
			</Dialog>
			<Dialog
				open={dialogStage === "paletteNameForm"}
				onClose={handleClosePaletteMetaForm}
			>
				<DialogTitle>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={changeDialogStage}>
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
						<Button onClick={handleClosePaletteMetaForm}>Cancel</Button>
						<Button type="submit" variant="contained" color="primary">
							Next
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
}

export default PaletteMetaForm;
