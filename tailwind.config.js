/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				yellowCustom: "#EFB814",
				brownCustom: "#89690B",
			},
			fontFamily: {
				logo: ["Charmonman", "cursive"],
				text: ["K2D", "sans-cursive"],
			},
		},
	},
	plugins: [],
};
