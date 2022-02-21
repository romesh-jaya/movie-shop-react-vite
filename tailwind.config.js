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
      black: colors.black,
      red: colors.red,
      gray: colors.gray,
    },
  },
  plugins: [],
};
