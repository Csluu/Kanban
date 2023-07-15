/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./Renderer/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"clear-dark-gray": "rgba(36, 36, 36, 0.90)",
				clear: "rgba(36, 36, 36, 0.0)",
				"opaque-dark-gray": "rgba(36, 36, 36, 1)",
				"dark-gray-highlight": "rgb(55, 55, 55)",
				"block-gray": "rgb(43, 53, 68)",
				"block-gray-2": "rgb(49, 59, 75)",
				"block-gray-3": "rgb(52, 57, 65)",
				"opaque-black": "rgba(0,0,0,0.30)",
				"orange-minimize": "rgba(241,174,27,1)",
				"red-cancel": "rgba(233,82,74,1)",
				outline: "rgba(87,88,89,1)",
			},
			boxShadow: {
				border:
					"0 3px 10px 2px rgba(0, 0, 0, 0.5), 0 5px 15px 2px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(87,88,89,1), inset 0 0 4px rgba(87,88,89,1)",
				edge: "inset 0px 0px 2px rgba(87,88,89,1)",
				highLight:
					"0 -1px 0px 0px rgba(2, 6, 23, 1), 0 4px 6px -1px rgba(2, 6, 23, 1), 0 2px 4px -1px rgba(2, 6, 23, 1)",
			},
		},
		fontFamily: { quicksand: ["Quicksand", "sans-serif"] },
		pointerEvents: {
			auto: "auto",
			none: "none",
			noDrag: "none", // add a new class called "noDrag"
		},
	},
	variants: {
		// ...
		pointerEvents: ["responsive"],
	},
	plugins: [],
};
