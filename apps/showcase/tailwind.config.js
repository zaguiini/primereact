/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');

module.exports = {
    corePlugins: {
        preflight: false
    },
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    },
    plugins: [primeui]
};
