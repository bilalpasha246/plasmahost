/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"], // Add JetBrains Mono
      },
      colors: {
        "plasma-black": "#131010",
      },
    },
  },
  plugins: [],
};
