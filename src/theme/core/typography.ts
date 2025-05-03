import type { TypographyVariantsOptions as MuiTypographyVariantsOptions } from '@mui/material/styles';
import { Inter, Poppins } from 'next/font/google';
import localFont from 'next/font/local';

import { pxToRem, responsiveFontSizes, setFont } from '../styles';

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontTertiaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
    coolveticaRegular: React.CSSProperties;
    coolveticaItalic: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily'];
    fontTertiaryFamily?: React.CSSProperties['fontFamily'];
    fontWeightSemiBold?: React.CSSProperties['fontWeight'];
    coolveticaRegular?: React.CSSProperties;
    coolveticaItalic?: React.CSSProperties;
  }
  interface ThemeVars {
    typography: Theme['typography'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    coolveticaRegular: true;
    coolveticaItalic: true;
  }
}

// ----------------------------------------------------------------------

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

// const coolveticaRegular = localFont({
//   src: 'assets/fonts/Coolvetica_Regular.otf',
//   weight: '400',
//   style: 'normal',
//   variable: '--font-coolvetica-regular',
//   display: 'swap',
// });

// const coolveticaRegularItalic = localFont({
//   src: 'assets/fonts/Coolvetica_Regular_Italic.otf',
//   weight: '400',
//   style: 'italic',
//   variable: '--font-coolvetica-regular-italic',
//   display: 'swap',
// });

// const coolvetica=localFont({
//   src: [
//     {path: '/assets/fonts/CoolveticaRegular.woff2', weight:'400', style:'normal'},
//     {path: '/assets/fonts/CoolveticaRegularItalic.woff2', weight:'400', style:'italic'},
//   ],
//   variable: '--font-coolvetica-regular',
//   display: 'swap'
// })

// ----------------------------------------------------------------------

// export const defaultFont = 'DM Sans Variable';
export const defaultFont = inter.style.fontFamily;

export const primaryFont = setFont(defaultFont);

// export const secondaryFont = setFont('Barlow');
export const secondaryFont = poppins.style.fontFamily;

// export const tertiaryFont = coolvetica.style.fontFamily;

// ----------------------------------------------------------------------

export const typography: MuiTypographyVariantsOptions = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  // fontTertiaryFamily: tertiaryFont,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    fontFamily: primaryFont,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    fontFamily: primaryFont,
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    fontFamily: primaryFont,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontFamily: primaryFont,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    fontFamily: primaryFont,
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontFamily: primaryFont,
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    fontFamily: primaryFont,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontFamily: primaryFont,
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    // fontFamily: tertiaryFont,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
  coolveticaRegular: {
    // fontFamily: coolveticaRegular.style.fontFamily,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  coolveticaItalic: {
    // fontFamily: coolveticaRegularItalic.style.fontFamily,
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
};
