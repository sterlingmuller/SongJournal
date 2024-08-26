import { ColorTheme } from '@src/components/common/enums';
import { colors as c } from '@src/theme/colors';
import { getColorWithOpacity } from '@src/utils/getColorWithOpacity';

export interface Theme {
  primary: string;
  mutedPrimary: string;
  secondary: string;
  primaryBackground: string;
  secondaryBackground: string;
  primaryText: string;
  headerText: string;
  highlight: string;
}

const themes: Record<ColorTheme, Theme> = {
  Light: {
    primary: c.coral,
    mutedPrimary: getColorWithOpacity(c.coral, 60),
    secondary: c.gold,
    primaryBackground: c.cream,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.gray,
  },
  Dark: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    primaryText: c.dimWhite,
    headerText: c.dimWhite,
    highlight: c.charcoal,
  },
  Metal: {
    primary: c.bloodRed,
    mutedPrimary: getColorWithOpacity(c.bloodRed, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    primaryText: c.bloodRed,
    headerText: c.dimGold,
    highlight: c.charcoal,
  },
  Psych: {
    primary: c.purple,
    mutedPrimary: getColorWithOpacity(c.purple, 60),
    secondary: c.mustard,
    primaryBackground: c.greenBean,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.mustard,
  },
  Pop: {
    primary: c.neonBlue,
    mutedPrimary: getColorWithOpacity(c.neonBlue, 60),
    secondary: c.violet,
    primaryBackground: c.pink,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sunscreen,
  },
  Surf: {
    primary: c.oceanBlue,
    mutedPrimary: getColorWithOpacity(c.oceanBlue, 60),
    secondary: c.sunset,
    primaryBackground: c.sunscreen,
    secondaryBackground: c.sand,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sand,
  },
};

export default themes;
