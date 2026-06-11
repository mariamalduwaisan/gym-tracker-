import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        rose:  { DEFAULT: '#C98B95', light: '#F0D5D8', dark: '#9E6470' },
        taupe: '#AFA198',
      },
    },
  },
  plugins: [],
}

export default config
