/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#F43F5E',
          500: '#E11D48',
          600: '#BE123C',
          700: '#9F1239',
          800: '#881337',
          900: '#4C0519',
          950: '#2A030E',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        linen: {
          50: '#FAF9F6',
          100: '#F5F5F0',
          200: '#E8E7DF',
          300: '#D5D3C6',
        },
        brand: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#F43F5E',
          500: '#E11D48',
          600: '#BE123C',
          700: '#9F1239',
          800: '#881337',
          900: '#4C0519',
        },
        primary: {
          DEFAULT: '#881337',
          hover: '#9F1239',
          light: '#BE123C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(136, 19, 55, 0.03), 0 4px 12px -2px rgba(136, 19, 55, 0.05)',
        'elevated': '0 10px 25px -5px rgba(136, 19, 55, 0.08), 0 8px 10px -6px rgba(136, 19, 55, 0.03)',
      }
    },
  },
  plugins: [],
}

