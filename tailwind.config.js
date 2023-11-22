/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./*.html",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                'inter': ['"Inter"', 'sans-serif'],
                'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ]
}