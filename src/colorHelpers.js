import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
		colors: {},
	};

	for (let level of levels) {
		newPalette.colors[level] = [];
	}

	for (let color of starterPalette.colors) {
		// Create scale of 10 shades for each color (in hex)
		let scale = generateScale(color.color, 10).reverse();
		// Place each shade to its corresponding shade level (50, 100, ... 900) along with other information as an object
		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${color.name} ${levels[i]}`,
				id: color.name.toLowerCase().replace(/ /g, "-"),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i])
					.css()
					.replace("rgb", "rgba")
					.replace(")", ",1.0)"),
			});
		}
	}

	return newPalette;
}

// Generate a range of colors
// An array with three color values (ex: [darkhex, hex, white]) that we're going to make a scale of.
function getRange(hexColor) {
	const end = "#fff";
	return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

// Generate a scale
// Gives us an object of 10 colors based off of an input color
function generateScale(hexColor, numberOfColors) {
	return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };
