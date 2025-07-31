import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};