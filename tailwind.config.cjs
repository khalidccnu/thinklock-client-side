/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        blue: {
          yankees: "#1d313e",
          prussian: "#052f4a",
          maastricht: "#011e30",
        },
        green: {
          "dark-jungle": "#10202b",
        },
      },
      fontFamily: {
        josefinSans: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
  },
};
