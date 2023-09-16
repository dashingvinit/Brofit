const COLORS = {
  primary: '#312651',
  secondary: '#444262',
  tertiary: '#FF7754',

  neon: '#e0fe10',
  bgColor: '#1c2227',
  bgGlass: 'rgba(0, 0, 0, .4)',
  bgGlassLight: 'rgba(255, 255, 255, .1)',
  bgLight: 'rgba(42, 47, 55, .6)',
  offWhite: '#9BA4B5',

  gray: '#83829A',
  gray2: '#C1C0C8',
  gray3: '#36454F',
  grey4: '#1d2226',
  black: '#28282B',
  dark: '#1c2227',
  green: '#e6fd54',
  white: '#F3F4F8',
  lightWhite: '#FAFAFC',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, SHADOWS };
