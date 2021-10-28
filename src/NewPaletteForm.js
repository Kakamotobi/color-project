import React from "react";
import { styled } from "@mui/material/styles";
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

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		height: "calc(100vh - 64px)",
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

// NewPaletteForm Component
function NewPaletteForm(props) {
	const [open, setOpen] = React.useState(true);
	const [colors, updateColors] = React.useState(props.palettes[0].colors);

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
		const rand = Math.floor(Math.random() * allColors.length);
		const randColor = allColors[rand];
		updateColors([...colors, randColor]);
	};

	const savePalette = (newPaletteName) => {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, "-"),
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

	return (
		<Box sx={{ display: "flex" }}>
			<NewPaletteFormNav
				drawerWidth={drawerWidth}
				colors={colors}
				palettes={props.palettes}
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
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button variant="contained" color="error" onClick={clearPalette}>
						Clear Palette
					</Button>
					<Button
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

export default NewPaletteForm;
