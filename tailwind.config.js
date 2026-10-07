/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        slate: 'var(--slate)',
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        marine: {
          DEFAULT: 'var(--marine)',
          deep: 'var(--marine-deep)',
          tint: 'var(--marine-tint)',
        },
        saffron: {
          DEFAULT: 'var(--saffron)',
          tint: 'var(--saffron-tint)',
        },
        gain: {
          DEFAULT: 'var(--gain)',
          tint: 'var(--gain-tint)',
        },
        loss: {
          DEFAULT: 'var(--loss)',
          tint: 'var(--loss-tint)',
        },
      },
      borderRadius: {
        control: 'var(--radius-control)',
        panel: 'var(--radius-panel)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        elevation: '0 8px 24px rgba(21, 33, 43, 0.12)',
      },
    },
  },
  plugins: [],
};
