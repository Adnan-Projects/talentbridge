import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium White/Grey Palette
        brand: {
          white:    '#ffffff',
          offwhite: '#f8f9fa',
          light:    '#f1f3f5',
          muted:    '#f0f4f8',
          border:   '#e5e7eb',
          divider:  '#d1d5db',
          subtle:   '#9ca3af',
          secondary:'#6b7280',
          tertiary: '#4b5563',
          primary:  '#374151',
          dark:     '#1f2937',
          darkest:  '#111827',
          black:    '#030712',
        },
        accent: {
          DEFAULT: '#374151',
          hover:   '#1f2937',
          light:   '#f1f3f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 16px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 4px 24px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)',
        'modal':   '0 24px 80px 0 rgba(0,0,0,0.12)',
        'float':   '0 8px 32px 0 rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
