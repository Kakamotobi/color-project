import React from "react";

function PaletteFooter(props) {
	const { paletteName, emoji } = props;

	return (
		<footer className="Palette__footer">
			{paletteName}
			<span className="Palette__footer__emoji">{emoji}</span>
		</footer>
	);
}

export default PaletteFooter;
