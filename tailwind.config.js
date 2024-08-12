/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*/*/*.html",
    "./frontend/profil/profil.html",
    "./connexion/connexion.html",
  ],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints
        'android':'320px',

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'lg': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      gridTemplateColumns: {
        // Custom column template similar to repeat(auto-fill, minmax(150px, 1fr))
        'custom': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      gridAutoRows: {
        // Custom row height similar to 16rem
        'custom': '16rem',
      },
    },
  },
  plugins: [],
}

