/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        mist: '#f4f4f4',
        ash: '#a3a3a3',
      },
      fontFamily: {
        geo: ['Sora', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.65' },
          '50%': { transform: 'scale(1.35)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
