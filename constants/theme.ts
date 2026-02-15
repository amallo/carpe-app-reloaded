/**
 * Design system: dark mode, tech-modern, minimalistic
 * Font: JetBrains Mono (walkie-talkie / terminal vibe)
 */

export const fontFamily = {
  regular: 'JetBrainsMono-Regular',
  medium: 'JetBrainsMono-Medium',
  semiBold: 'JetBrainsMono-SemiBold',
} as const;

export const colors = {
  background: '#0F1115',
  surface: '#1A1D24',
  primary: '#2ED573',
  text: '#E6EAF0',
  textDim: '#8A9099',
  alert: '#FF6B6B',
} as const;

export const typography = {
  title: {
    fontSize: 21,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600' as const,
  },
  headline: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600' as const,
  },
  headlineRegular: {
    fontSize: 17,
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    fontWeight: '400' as const,
  },
  meta: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    fontWeight: '400' as const,
  },
  metaMedium: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
  },
} as const;

export const spacing = {
  padding: 16,
  section: 24,
} as const;

/** Primary button glow (shadow) */
export const primaryGlow = {
  shadowColor: '#2ED573',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.4,
  shadowRadius: 12,
  elevation: 4,
} as const;
