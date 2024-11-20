module.exports = {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
      './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'font-13' : '0.81288rem',
                'font-15' : '0.938rem',
                'font-18' : '1.12525rem !important',
                'font-24' : '1.49975rem !important',
            },
            colors: {
                'body' : '#333e48',
                'primary' : '#20d600',
                'white' : '#ffffff',
                'purple' : '#3f3cbb',
                'gray-110' : '#7c7c7c',
                'gray-100' : '#e8e8e8',
                'gray-90' : '#333e48',
                'gray-50' : '#959595',
                'gray-22' : '#1e2022',
                'gray-5' : '#cad5d5',
                'gray-13' : '#f8f8f8',
                'green-334' : '#334141',
                'green-022' : '#1e2022',
            }
        }
        
    },
    plugins: [
        function ({ addBase }) {
            addBase({
                body: {
                    fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    color: '#333e48',
                },
            });
        },
    ],
}
  