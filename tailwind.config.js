/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./*.html",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        colors: {
            'cc-blue': '#0F5CFA',
        },
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