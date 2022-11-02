/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat, sans-serif"],
    },
    extend: {
      zIndex: {
        500: "500",
      },
      gridTemplateColumns: {
        "commit-button": "50px 1fr",
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [require("daisyui")],
};
