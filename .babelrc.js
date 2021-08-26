const presets = [
	[
		"@babel/preset-env",
		{
			"useBuiltIns": "entry",
			"corejs": 3,
			"debug": false,
		}
	],
];
const plugins = [];

module.exports = { presets, plugins };