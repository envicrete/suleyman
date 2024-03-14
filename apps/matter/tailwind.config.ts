import type { Config } from 'tailwindcss';

import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import baseConfig from '@envi/tailwind-config/web';

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, '../../packages/ui/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 120s linear infinite',
        blink: 'blink 1.4s both infinite',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100% ': { opacity: '0.2' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      screens: {
        xs: '330px',
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@headlessui/tailwindcss'),
      plugin(({ matchUtilities, theme }) => {
        matchUtilities(
          {
            'animation-delay': (value: string) => ({
              'animation-delay': value,
            }),
          },
          {
            values: theme('transitionDelay'),
          },
        );
      }),
    ],
  },
} satisfies Config;
