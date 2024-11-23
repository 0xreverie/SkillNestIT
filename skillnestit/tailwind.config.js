/** @type {import('tailwindcss').Config} */
// const { nextui } = require("@nextui-org/react");
import { nextui } from '@nextui-org/react';

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#D6EFD8",
        "secondary": "#1A5319",
        "tertiary": "#80AF81"
      }
    },
  },
  plugins: [nextui()],
};
