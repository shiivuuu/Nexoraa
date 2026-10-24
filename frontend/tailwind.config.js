/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Design System
        'nex-bg': '#F5F0E8',            // Warm porcelain background
        'nex-porcelain': '#F5F0E8',
        'nex-forest': '#244638',        // Deep forest green
        'nex-forest-dark': '#1B362B',   // Dark forest green
        'nex-forest-light': '#2E5947',  // Hover forest green
        'nex-copper': '#A15E40',        // Burnt copper accent
        'nex-copper-light': '#B76F4E',
        'nex-copper-dark': '#874E34',
        'nex-surface': '#FFFCF7',       // Soft white surfaces / cards
        'nex-card': '#FFFCF7',
        'nex-sandstone': '#E6DFD3',     // Sandstone sections
        'nex-sandstone-light': '#EFE9DE',
        'nex-primary': '#252922',       // Primary text
        'nex-secondary': '#686B61',     // Secondary text
        'nex-muted': '#8A8D84',         // Muted secondary text
        'nex-border': 'rgba(36, 70, 56, 0.12)',
        'nex-border-strong': 'rgba(36, 70, 56, 0.22)',
        'nex-border-sandstone': 'rgba(37, 41, 34, 0.10)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(36, 70, 56, 0.04), 0 10px 30px rgba(36, 70, 56, 0.03)',
        'card': '0 1px 3px rgba(36, 70, 56, 0.04), 0 8px 24px rgba(36, 70, 56, 0.06)',
        'elevated': '0 4px 6px -1px rgba(36, 70, 56, 0.05), 0 20px 40px -10px rgba(36, 70, 56, 0.08)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
