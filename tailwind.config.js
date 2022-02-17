const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "header-start": "#3478c1",
      black: colors.black,
      red: colors.red,
    },
  },
  plugins: [],
};
