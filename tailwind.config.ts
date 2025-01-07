import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-space-grotesk)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#9CA3AF', // text-gray-400
            h1: {
              color: '#FFFFFF',
              fontWeight: '700',
            },
            h2: {
              color: '#FFFFFF',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#FFFFFF',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            strong: {
              color: '#FFFFFF',
            },
            a: {
              color: '#00E6FF',
              '&:hover': {
                color: '#33EBFF',
              },
            },
            blockquote: {
              color: '#9CA3AF',
              borderLeftColor: '#00E6FF',
            },
            code: {
              color: '#00E6FF',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'ul > li::before': {
              backgroundColor: '#00E6FF',
            },
            'ol > li::before': {
              color: '#00E6FF',
            },
            hr: {
              borderColor: '#374151',
            },
          },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow-reverse': 'spin 8s linear infinite reverse',
        'orbit': 'orbit 20s linear infinite',
        'orbit-delayed': 'orbit 20s linear infinite 5s',
        'orbit-delayed-2': 'orbit 20s linear infinite 10s',
        'orbit-delayed-3': 'orbit 20s linear infinite 15s',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.9', transform: 'scale(0.98)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;
