/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				bgcolor: '#e5e7eb',

				dbgcolor: '#272727',
				titlecolor: 'orange',
				buttonTextColor: '#fff',
				buttonBg: "#f57c00'",
			},
		},
	},
	plugins: [],
}
