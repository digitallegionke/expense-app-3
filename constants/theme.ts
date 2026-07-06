export const colors = {
  background: '#F0F0F0',
  card: '#EAEAEA',
  cardOutline: '#E6E6E6',
  cardOverlay: '#FFFFFF78',

  textDark: '#3D3C40',
  textBlack: '#000000',
  textMuted: '#8E8E8E',
  textMuted2: '#939393',
  textMuted3: '#666666',
  textMuted4: '#828282',
  textMuted5: '#5F5F5F',

  primary: '#69508C',
  primaryTint: '#69508C17',
  primaryTint2: '#DEDBF1',

  teal: '#158578',
  tealTint: '#1585780F',

  fuelTagBg: '#746CA717',
  fuelTagText: '#675CA8',

  warning: '#A96A35',
  warningTintLight: '#A96A3512',
  warningTintStrong: '#A96A3521',

  divider: '#DCDCDC',
  divider2: '#E0E0E0',

  white: '#FFFFFF',
  chevron: '#949494',
  danger: '#E00303',
} as const;

// The Paper design specs "Open Runde" for UI text. Its font files aren't
// distributed on npm/Google Fonts, so we substitute Nunito (same rounded,
// friendly geometric-sans category) via @expo-google-fonts/nunito. Drop real
// OpenRunde-*.ttf files into assets/fonts and swap the values below to get
// pixel-exact typography.
export const fonts = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  mono: 'ChivoMono_400Regular',
  monoMedium: 'ChivoMono_500Medium',
  monoSemibold: 'ChivoMono_600SemiBold',
} as const;

export const radii = {
  sm: 4,
  md: 6,
  pill: 30,
  round: 50,
} as const;
