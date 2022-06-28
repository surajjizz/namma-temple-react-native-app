import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: '#0C6157',
    secondary: '#063e37',
    tertiary: '#075e54',
    lightGreen: '#25D366',
    white: '#ffffff',
    black: '#000000',
    success: '#008000',
    warning: '#ffa500',
    blue: '#007bff',
    error: '#ff0000',
    gray: '#808080',
    darkGray: '#a9a9a9',
    lightGray: '#313131',
    orange: '#FFEB3B',
    overlay: 'rgba(12, 97, 87, 0.8)',
    bottomTabBg1: '#ffe1c5',
    bottomTabBg2: '#c993f57a',
    bottomTabBg3: '#c9caf3',
    bottomTabBg4: '#bce3fa',
    bottomTabBg5: '#ffe1c5',
    bottomTabText1: '#c56b14',
    bottomTabText2: '#dc7ff3',
    bottomTabText3: '#6f73ea',
    bottomTabText4: '#2d9cdb',
    bottomTabText5: '#c56b14'
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};
export const FONTS = {
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

const Theme = { COLORS, SIZES, FONTS, width, height };

export default Theme;
