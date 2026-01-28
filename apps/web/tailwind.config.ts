import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          palest: 'var(--primary-palest)',
          pale: 'var(--primary-pale)',
          lightest: 'var(--primary-lightest)',
          lighter: 'var(--primary-lighter)',
          base: 'var(--primary-base)',
          darker: 'var(--primary-darker)',
        },
        basic: {
          100: 'var(--basic-100)',
          200: 'var(--basic-200)',
          300: 'var(--basic-300)',
          400: 'var(--basic-400)',
          500: 'var(--basic-500)',
          600: 'var(--basic-600)',
          white: 'var(--basic-white)',
          black: 'var(--basic-black)',
        },
        success: 'var(--success)',
        tips: 'var(--tips)',
        destructive: 'var(--destructive)',
        alert: 'var(--alert)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-y-in': 'slideYIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'jelly': 'jelly 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideYIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        jelly: {
          '0%': { transform: 'scale(1, 1)' },
          '30%': { transform: 'scale(1.25, 0.75)' },
          '40%': { transform: 'scale(0.75, 1.25)' },
          '50%': { transform: 'scale(1.15, 0.85)' },
          '65%': { transform: 'scale(0.95, 1.05)' },
          '75%': { transform: 'scale(1.05, 0.95)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
