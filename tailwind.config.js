const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        orange: colors.orange,
        'th-background': 'var(--background)',
        'th-background-secondary': 'var(--background-secondary)',
        'th-foreground': 'var(--foreground)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary-medium': 'var(--primary-medium)',
        'th-primary-light': 'var(--primary-light)',
        'th-secondary-dark': 'var(--secondary-dark)',
        'th-secondary-medium': 'var(--secondary-medium)',
        'th-secondary-light': 'var(--secondary-light)',        
        'th-accent-dark': 'var(--accent-dark)',
        'th-accent-medium': 'var(--accent-medium)',
        'th-accent-light': 'var(--accent-light)',
      },
      backgroundImage: {
        'coverart': "url('../public/images/coverart.png')",
        'coverart-small': "url('../public/images/coverart-small.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
