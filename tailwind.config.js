/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#130C36',
          50: '#1a1245',
          100: '#211854',
          200: '#2a1f63',
          300: '#332672',
          400: '#3E3B95',
          500: '#4A47A3',
          600: '#5B58B1',
          700: '#6D6ABF',
          800: '#8A87CC',
          900: '#A8A5D9',
        },
        violet: {
          DEFAULT: '#3E3B95',
          light: '#5B58B1',
          dark: '#2a1f63',
        },
        cyan: {
          DEFAULT: '#21D3F3',
          50: '#E8FAFE',
          100: '#D1F5FD',
          200: '#A3ECFA',
          300: '#75E3F8',
          400: '#47DAF5',
          500: '#21D3F3',
          600: '#1AB5C9',
          700: '#138C9E',
          800: '#0C6374',
          900: '#053A49',
        },
        magenta: {
          DEFAULT: '#D21AE8',
          light: '#E04DF0',
          dark: '#B010C8',
        },
        purple: {
          DEFAULT: '#8723E7',
          light: '#A04DEF',
          dark: '#6B1AB8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'glow-border': 'glowBorder 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-6px) rotate(1deg)' },
          '66%': { transform: 'translateY(3px) rotate(-0.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(33, 211, 243, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(33, 211, 243, 0.4)' },
        },
        glowBorder: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(33, 211, 243, 0.15), inset 0 0 10px rgba(33, 211, 243, 0.05)' },
          '50%': { boxShadow: '0 0 20px rgba(33, 211, 243, 0.25), inset 0 0 15px rgba(33, 211, 243, 0.08)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #D21AE8, #8723E7)',
        'gradient-brand-hover': 'linear-gradient(135deg, #E04DF0, #A04DEF)',
        'gradient-cyan': 'linear-gradient(135deg, #21D3F3, #1AB5C9)',
        'gradient-dark': 'linear-gradient(135deg, #130C36, #1a1245)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(33, 211, 243, 0.3)',
        'glow-magenta': '0 0 20px rgba(210, 26, 232, 0.3)',
        'glow-violet': '0 0 20px rgba(62, 59, 149, 0.3)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.04)',
        'luxury': '0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
