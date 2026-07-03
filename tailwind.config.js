// tailwind.config.js
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    // ... your other paths (app, components, etc.)
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // <--- MUST BE PRESENT
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
