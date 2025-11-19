import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,tsx}",
        "./components/**/*.{js,ts,tsx}",
        "./app/**/*.{js,ts,tsx}",
        "./src/**/*.{js,ts,tsx}",
    ],
    // The theme block is removed.
    // Our theme (colors, fonts) is now defined in `app/globals.css`
    // using the @theme directive, per Tailwind v4 standards.
    plugins: [],
};
export default config;