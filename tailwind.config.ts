import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#09090b',
        panel: '#111114',
        ink: '#f5f5f5',
        muted: '#a1a1aa',
        accent: '#84cc16',
        accentSoft: '#bef264',
      },
      boxShadow: {
        gear: '0 20px 50px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
