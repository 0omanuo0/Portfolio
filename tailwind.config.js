/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ["./templates/**/*.{html,js}"],
    theme: {
        extend: {
            screens: {
                '2md': '1200px',
                'xs': '400px',
            },
            keyframes: {
                'ping-simple': {
                    '75%, 100%': { transform: 'scale(1.25)', opacity: '0' }
                },
                'wiggle': {
                    '0%, 100%': { transform: 'rotate(-2deg)' },
                    '50%': { transform: 'rotate(2deg)' },
                },
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'ping-simple': 'ping-simple 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
