/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#1e40af",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        light: "#f9fafb",
        dark: "#1f2937",
      },
    },
  },
  plugins: [],
}
