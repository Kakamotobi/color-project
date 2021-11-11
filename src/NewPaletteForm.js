import React from "react";
import { withStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { arrayMoveImmutable } from "array-move";
import DraggableColorList from "./DraggableColorList";
import NewPaletteFormNav from "./NewPaletteFormNav.js";
import ColorPickerForm from "./ColorPickerForm.js";
import {
	drawerWidth,
	styles,
	Main,
	DrawerHeader,
} from "./styles/NewPaletteFormStyles.js";
import seedColors from "./seedColors.js";

// NewPaletteForm Component
function NewPaletteForm(props) {
	const [open, setOpen] = React.useState(true);
	const [colors, updateColors] = React.useState(seedColors[0].colors);

	const paletteIsFull = colors.length >= props.maxColors;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColor) => {
		updateColors([...colors, newColor]);
	};

	const removeColor = (colorName) => {
		updateColors(colors.filter((color) => color.name !== colorName));
	};

	const addRandomColor = () => {
		const allColors = props.palettes.map((palette) => palette.colors).flat();
		let rand;
		let randColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randColor = allColors[rand];
			isDuplicateColor = this.state.colors.some(
				(color) => color.name === randColor.name
			);
		}
		updateColors([...colors, randColor]);
	};

	const savePalette = (newPalette) => {
		newPalette = {
			...newPalette,
			id: newPalette.paletteName.toLowerCase().replace(/ /g, "-"),
			colors: colors,
		};
		props.savePalette(newPalette);
		props.history.push("/");
	};

	const clearPalette = () => {
		updateColors([]);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		updateColors(arrayMoveImmutable(colors, oldIndex, newIndex));
	};

	const { classes, palettes } = props;

	return (
		<Box sx={{ display: "flex" }}>
			<NewPaletteFormNav
				drawerWidth={drawerWidth}
				colors={colors}
				palettes={palettes}
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				savePalette={savePalette}
			/>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						alignItems: "center",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttonsContainer}>
						<Button
							className={classes.button}
							variant="contained"
							color="error"
							onClick={clearPalette}
						>
							Clear Palette
						</Button>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm
						colors={colors}
						paletteIsFull={paletteIsFull}
						addNewColor={addNewColor}
					/>
				</div>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
					distance={2}
				/>
			</Main>
		</Box>
	);
}

NewPaletteForm.defaultProps = {
	maxColors: 20,
};

export default withStyles(styles)(NewPaletteForm);
