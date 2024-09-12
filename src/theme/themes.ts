import { ColorTheme } from '@src/components/common/enums';
import { colors as c } from '@src/theme/colors';
import { getColorWithOpacity } from '@src/utils/getColorWithOpacity';

export interface Theme {
  primary: string;
  mutedPrimary: string;
  secondary: string;
  primaryBackground: string;
  secondaryBackground: string;
  clearBackground: string;
  primaryText: string;
  headerText: string;
  highlight: string;
  conductorBackground: string;
}

const themes: Record<ColorTheme, Theme> = {
  Light: {
    primary: c.coral,
    mutedPrimary: getColorWithOpacity(c.coral, 60),
    secondary: c.gold,
    primaryBackground: c.cream,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.gray,
    conductorBackground: c.salmon,
  },
  Dark: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    clearBackground: c.white,
    primaryText: c.dimWhite,
    headerText: c.dimWhite,
    highlight: c.charcoal,
    conductorBackground: c.salmon,
  },
  Metal: {
    primary: c.bloodRed,
    mutedPrimary: getColorWithOpacity(c.bloodRed, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    clearBackground: c.white,
    primaryText: c.bloodRed,
    headerText: c.dimGold,
    highlight: c.charcoal,
    conductorBackground: c.salmon,
  },
  Psych: {
    primary: c.purple,
    mutedPrimary: getColorWithOpacity(c.purple, 60),
    secondary: c.mustard,
    primaryBackground: c.greenBean,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.mustard,
    conductorBackground: c.salmon,
  },
  Pop: {
    primary: c.neonBlue,
    mutedPrimary: getColorWithOpacity(c.neonBlue, 60),
    secondary: c.violet,
    primaryBackground: c.pink,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sunscreen,
    conductorBackground: c.salmon,
  },
  Surf: {
    primary: c.oceanBlue,
    mutedPrimary: getColorWithOpacity(c.oceanBlue, 60),
    secondary: c.sunset,
    primaryBackground: c.sunscreen,
    secondaryBackground: c.sand,
    clearBackground: c.white,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sand,
    conductorBackground: c.salmon,
  },
};

export default themes;
