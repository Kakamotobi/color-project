import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMoveImmutable } from "array-move";
import DraggableColorList from "./DraggableColorList";

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

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

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
	const [currColor, updateCurrColor] = React.useState("teal");
	const [colors, updateColors] = React.useState(props.palettes[0].colors);
	const [newNames, setName] = React.useState({
		newColorName: "",
		newPaletteName: "",
	});

	const handleChange = (evt) => {
		setName({ ...newNames, [evt.target.name]: evt.target.value });
	};

	const handleUpdateCurrColor = (newColor) => {
		updateCurrColor(newColor.hex);
	};

	const handleAddNewColor = () => {
		const newColor = {
			color: currColor,
			name: newNames.newColorName,
		};
		updateColors([...colors, newColor]);
		setName({ ...newNames, colorName: "" });
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSavePalette = () => {
		let name = newNames.newPaletteName;
		const newPalette = {
			paletteName: name,
			id: name.toLowerCase().replace(/ /g, "-"),
			colors: colors,
		};
		props.savePalette(newPalette);
		props.history.push("/");
	};

	const removeColor = (colorName) => {
		updateColors(colors.filter((color) => color.name !== colorName));
	};

	const addRandomColor = () => {
		// pick random color from existing palettes
		const allColors = props.palettes.map((palette) => palette.colors).flat();
		const rand = Math.floor(Math.random() * allColors.length);
		const randColor = allColors[rand];
		updateColors([...colors, randColor]);
	};

	const clearPalette = () => {
		updateColors([]);
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		updateColors(arrayMoveImmutable(colors, oldIndex, newIndex));
	};

	React.useEffect(() => {
		ValidatorForm.addValidationRule("isColorUnique", () => {
			return colors.every((color) => color.color !== currColor);
		});
		ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
			return colors.every(
				(color) => color.name.toLowerCase() !== value.toLowerCase()
			);
		});
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
			return props.palettes.every(
				(palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	});

	const paletteIsFull = colors.length >= props.maxColors;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Persistent drawer
					</Typography>
					<ValidatorForm onSubmit={handleSavePalette}>
						<TextValidator
							label="Palette Name"
							name="newPaletteName"
							value={newNames.newPaletteName}
							onChange={handleChange}
							validators={["required", "isPaletteNameUnique"]}
							errorMessages={["Enter palette name", "Name already used"]}
						/>
						<Button type="submit" variant="contained" color="primary">
							Save Palette
						</Button>
					</ValidatorForm>
				</Toolbar>
			</AppBar>
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
				<ChromePicker
					color={currColor}
					onChangeComplete={handleUpdateCurrColor}
				/>
				<ValidatorForm onSubmit={handleAddNewColor}>
					<TextValidator
						name="newColorName"
						value={newNames.newColorName}
						onChange={handleChange}
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
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
				/>
			</Main>
		</Box>
	);
}

NewPaletteForm.defaultProps = {
	maxColors: 20,
};

export default NewPaletteForm;
