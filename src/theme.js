import { hsl } from 'polished'

const GAP = 64

export default {
  // Colors
  black: hsl(0, 0, 0.04),
  blackBis: hsl(0, 0, 0.07),
  blackTer: hsl(0, 0, 0.14),
  greyDarker: hsl(0, 0, 0.21),
  greyDark: hsl(0, 0, 0.29),
  grey: hsl(0, 0, 0.48),
  greyLight: hsl(0, 0, 0.71),
  greyLighter: hsl(0, 0, 0.86),
  whiteTer: hsl(0, 0, 0.96),
  whiteBis: hsl(0, 0, 0.98),
  white: hsl(0, 0, 1),
  orange: hsl(14, 1, 0.53),
  yellow: hsl(48, 1, 0.67),
  green: hsl(141, 0.71, 0.48),
  turquoise: hsl(171, 1, 0.41),
  cyan: hsl(204, 0.86, 0.53),
  blue: hsl(217, 0.71, 0.53),
  purple: hsl(271, 1, 0.71),
  red: hsl(348, 1, 0.61),

  // Typography
  familySansSerif: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  familyMonospace: 'monospace',
  renderMode: 'optimizeLegibility',

  size1: '3rem',
  size2: '2.5rem',
  size3: '2rem',
  size4: '1.5rem',
  size5: '1.25rem',
  size6: '1rem',
  size7: '0.75rem',

  weightLight: '300',
  weightNormal: '400',
  weightMedium: '500',
  weightSemibold: '600',
  weightBold: '700',

  // Responsiveness
  // The container horizontal gap, which acts as the offset for breakpoints
  gap: `${GAP}px`,
  // 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
  tablet: '769px',
  // 960px container + 4rem
  desktop: `${960 + (2 * GAP)}px`,
  // 1152px container + 4rem
  widescreen: `${1152 + (2 * GAP)}px`,
  widescreenEnabled: true,
  // 1344px container + 4rem
  fullhd: `${1344 + (2 * GAP)}px`,
  fullhdEnabled: true,

  // Miscellaneous
  easing: 'ease-out',
  radiusSmall: '2px',
  radius: '4px',
  radiusLarge: '6px',
  radiusRounded: '290486px',
  speed: '86ms',

  // Flags
  variableColumns: true
}
