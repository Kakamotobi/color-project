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
import DraggableColorBox from "./DraggableColorBox.js";

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

function NewPaletteForm(props) {
	const [open, setOpen] = React.useState(true);
	const [currColor, updateCurrColor] = React.useState("teal");
	const [colors, addNewColor] = React.useState([
		{ color: "blue", name: "normal blue" },
	]);
	// const [newColorName, updateNewColorName] = React.useState("");
	// const [newPaletteName, updateNewPaletteName] = React.useState("");

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
		addNewColor([...colors, newColor]);
		// updateNewColorName("");
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
					<Button variant="contained" color="secondary">
						Clear Palette
					</Button>
					<Button variant="contained" color="primary">
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
						style={{ backgroundColor: currColor }}
					>
						Add Color
					</Button>
				</ValidatorForm>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				{colors.map((color) => (
					<DraggableColorBox color={color.color} name={color.name} />
				))}
			</Main>
		</Box>
	);
}

export default NewPaletteForm;
