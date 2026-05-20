import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        noir: {
          DEFAULT: '#0B0B0B',
          100: '#1A1A1A',
          200: '#222222',
          300: '#2E2E2E',
          400: '#3D3D3D',
        },
        olive: {
          DEFAULT: '#556B2F',
          light: '#6B8B3E',
          dark: '#3D4D22',
          muted: '#4A5F2A',
        },
        gold: {
          DEFAULT: '#C8A96B',
          light: '#D4BA82',
          dark: '#A88A50',
          muted: '#B09060',
          pale: '#E8D5A3',
        },
        cream: {
          DEFAULT: '#F5F5F5',
          warm: '#EDE8DC',
          muted: '#D4CFC4',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #C8A96B 0%, #E8D5A3 50%, #A88A50 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B0B0B 0%, #1A1A1A 100%)',
        'olive-gradient': 'linear-gradient(135deg, #556B2F 0%, #3D4D22 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-gold': { '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 169, 107, 0.4)' }, '50%': { boxShadow: '0 0 0 15px rgba(200, 169, 107, 0)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      boxShadow: {
        gold: '0 0 30px rgba(200, 169, 107, 0.15)',
        'gold-lg': '0 0 60px rgba(200, 169, 107, 0.2)',
        'dark-lg': '0 25px 50px rgba(0, 0, 0, 0.8)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
