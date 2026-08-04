/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D2FE30',
          50: '#f6ffb3',
          100: '#effe80',
          200: '#e3fd4d',
          300: '#D2FE30',
          400: '#b8e020',
          500: '#9cc215',
        },
        secondary: {
          DEFAULT: '#6A25D5',
          50: '#f0e8ff',
          100: '#d9c4ff',
          200: '#b897ff',
          300: '#8f5ef7',
          400: '#7a3de6',
          500: '#6A25D5',
          600: '#5a1db8',
          700: '#4a169a',
          800: '#3a0e7a',
          900: '#2a085c',
        },
        accent: {
          DEFAULT: '#F6502F',
          light: '#ff7a5a',
          dark: '#d43a1a',
        },
        neutral: {
          DEFAULT: '#FEFEFE',
          50: '#FEFEFE',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D1D1D1',
          400: '#A8A8A8',
          500: '#737373',
          600: '#525252',
          700: '#3D3D3D',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        heading: ['Sora', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['clamp(2.25rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 2vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl2': '18px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'medium': '0 8px 40px rgba(0,0,0,0.1)',
        'strong': '0 16px 64px rgba(0,0,0,0.14)',
        'primary': '0 8px 32px rgba(210, 254, 48, 0.4)',
        'secondary': '0 8px 32px rgba(106, 37, 213, 0.3)',
        'glow': '0 0 60px rgba(210, 254, 48, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #f8f4ff 0%, #FEFEFE 50%, #f5fff0 100%)',
        'gradient-primary': 'linear-gradient(135deg, #D2FE30 0%, #b8e020 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #6A25D5 0%, #8f5ef7 100%)',
        'gradient-cta': 'linear-gradient(135deg, #D2FE30 0%, #c5f020 100%)',
      },
    },
  },
  plugins: [],
}
