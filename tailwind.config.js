/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"宋体"', 'SimSun', 'serif'],
        sans: ['system-ui', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      colors: {
        brand: {
          'void':    '#080a0f',
          'deep':    '#0a0c0f',
          'base':    '#0d0f14',
          'surface': '#14161d',
          'elevated':'#1a1d26',
          'border-subtle':  'rgba(255,255,255,0.04)',
          'border-default': 'rgba(255,255,255,0.08)',
          'border-emphasis':'rgba(255,255,255,0.12)',
          'glass': 'rgba(255,255,255,0.03)',
          'glass-hover': 'rgba(255,255,255,0.06)',
          'gold':            '#fde68a',
          'gold-hover':      '#fcd34d',
          'gold-glow':       '#fbbf24',
          'gold-soft':       'rgba(253,230,138,0.12)',
          'gold-border':     'rgba(253,230,138,0.20)',
          'gold-glow-weak':  'rgba(253,230,138,0.08)',
          'gold-glow-medium':'rgba(253,230,138,0.15)',
          'gold-glow-strong':'rgba(253,230,138,0.25)',
          'text-primary':   '#e7e5e4',
          'text-secondary': '#a8a29e',
          'text-tertiary':  '#78716c',
          'text-disabled':  '#57534e',
          'danger':        '#fca5a5',
          'danger-soft':   'rgba(248,113,113,0.12)',
          'danger-border': 'rgba(248,113,113,0.25)',
        },
      },
      boxShadow: {
        'glow-weak':   '0 0 24px rgba(253,230,138,0.06), 0 0 0 1px rgba(255,255,255,0.06)',
        'glow-medium': '0 0 24px rgba(253,230,138,0.10), 0 0 0 1px rgba(253,230,138,0.15)',
        'glow-strong': '0 0 40px rgba(253,230,138,0.15), 0 0 0 1px rgba(253,230,138,0.20)',
        'glow-cta':    '0 0 32px rgba(253,230,138,0.18), 0 0 64px rgba(253,230,138,0.06)',
        'glow-error':  '0 0 20px rgba(248,113,113,0.15), 0 0 0 1px rgba(248,113,113,0.25)',
      },
      animation: {
        'breathe':      'breathe 3s ease-in-out infinite',
        'breathe-slow': 'breathe 6s ease-in-out infinite',
        'pulse-gold':   'pulseGold 2s ease-in-out infinite',
        'float':        'float 12s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.12' },
          '50%':      { opacity: '0.22' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 32px rgba(253,230,138,0.12)' },
          '50%':      { boxShadow: '0 0 48px rgba(253,230,138,0.22)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
