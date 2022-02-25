const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // apply only for devices that have hover ability https://stackoverflow.com/a/60478751
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
    colors: {
      "header-start": "#3478c1",
      // note: import only the color palettes we need, otherwise bundle size will increase
      black: colors.black, // note: black color doesn't have shades
      red: colors.red,
      gray: colors.gray,
      blue: colors.blue,
    },
  },
  plugins: [],
};
