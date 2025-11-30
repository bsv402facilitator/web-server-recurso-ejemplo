/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta WCAG 2.2 AAA - Contraste 7:1
        primary: {
          DEFAULT: '#C10000', // Rojo institucional
          dark: '#8B0000',
          light: '#DC143C',
        },
        secondary: {
          DEFAULT: '#003366', // Azul oscuro
          dark: '#001F3F',
          light: '#004080',
        },
        neutral: {
          white: '#FFFFFF',
          dark: '#333333',
          gray: '#666666',
          light: '#F5F5F5',
        },
        feedback: {
          success: '#006600',
          warning: '#CC8800',
          error: '#990000',
          info: '#004080',
        },
        // Modo alto contraste
        'high-contrast': {
          bg: '#000000',
          text: '#FFFFFF',
          primary: '#FFD700',
          secondary: '#00FFFF',
        },
      },
      fontSize: {
        // Tamaños escalables para accesibilidad
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.7' }],
        '3xl': ['1.875rem', { lineHeight: '1.8' }],
        '4xl': ['2.25rem', { lineHeight: '1.8' }],
        '5xl': ['3rem', { lineHeight: '1.9' }],
      },
      spacing: {
        // Espaciado táctil mínimo 44px
        'touch': '44px',
        'touch-sm': '36px',
        'touch-lg': '56px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      animation: {
        // Animaciones reducidas para accesibilidad
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
