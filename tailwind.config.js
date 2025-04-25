/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2ed',
          100: '#fde2d5',
          200: '#fbcdbb',
          300: '#f7ac90',
          400: '#f1825a',
          500: '#e95420', // Ubuntu orange
          600: '#d94314',
          700: '#b33310',
          800: '#92280f',
          900: '#782411',
        },
        secondary: {
          50: '#e6ffe0',
          100: '#d0ffc2',
          200: '#a0ff85',
          300: '#71ff47',
          400: '#42eb0a',
          500: '#14a800', // main secondary
          600: '#108600',
          700: '#0c6400',
          800: '#084200',
          900: '#042100',
        },
        accent: {
          50: '#f0ebff',
          100: '#e1d7ff',
          200: '#c3afff',
          300: '#a588ff',
          400: '#8760ff',
          500: '#6e4bdb', // main accent
          600: '#5a3db8',
          700: '#462e94',
          800: '#33216b',
          900: '#1f1442',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card-hover': '0 10px 15px -3px rgba(233, 84, 32, 0.1), 0 4px 6px -2px rgba(233, 84, 32, 0.05)',
      },
    },
  },
  plugins: [],
}