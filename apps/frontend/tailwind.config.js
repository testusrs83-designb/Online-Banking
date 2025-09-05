module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-wf-red)",
        secondary: "var(--color-wf-gold)",
        accent: "var(--color-wf-white)",
        background: "var(--color-wf-bg)",
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '2rem',
        'xl': '4rem'
      }
    }
  },
  plugins: []
};
