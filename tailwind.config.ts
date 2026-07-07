import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Minimalist Brand colors
        primary: {
          DEFAULT: '#B8860B', // Bronze/Gold
          50: '#FDFCF8',
          100: '#F8F3E6',
          200: '#EEE1C0',
          300: '#E1C894',
          400: '#D2AB62',
          500: '#B8860B', // Dark Goldenrod
          600: '#9E6F05',
          700: '#7E5506',
          800: '#64420A',
          900: '#54370E',
        },
        secondary: {
          DEFAULT: '#111111', // Black/Dark
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#111111', // Deep Black
        },
        accent: {
          DEFAULT: '#8B5A2B', // Wood Brown
          50: '#FBF5ED',
          100: '#F5E4CC',
          200: '#EBC999',
          300: '#E1AE66',
          400: '#D79333',
          500: '#B87333',
          600: '#A5672E',
          700: '#925B29',
          800: '#7F4F24',
          900: '#6C431F',
        },
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        // Shadcn compatible
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#666666',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', ...fontFamily.sans],
        serif: ['var(--font-playfair)', ...fontFamily.serif],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C89B3C 0%, #8B5A2B 100%)',
        'gradient-bronze': 'linear-gradient(135deg, #B87333 0%, #8B5A2B 100%)',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(139, 90, 43, 0.08)',
        'card-hover': '0 8px 24px rgba(139, 90, 43, 0.16)',
        'gold': '0 4px 16px rgba(200, 155, 60, 0.3)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}

export default config
