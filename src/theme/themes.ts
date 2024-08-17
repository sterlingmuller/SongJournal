import { ColorTheme } from '@src/components/common/enums';
import { colors as c } from '@src/theme/colors';

export interface Theme {
  primary: string;
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
    secondary: c.gold,
    primaryBackground: c.cream,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.gray,
  },
  Dark: {
    primary: c.deepCharcoal,
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    primaryText: c.dimWhite,
    headerText: c.dimWhite,
    highlight: c.charcoal,
  },
  Metal: {
    primary: c.bloodRed,
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    primaryText: c.bloodRed,
    headerText: c.dimGold,
    highlight: c.charcoal,
  },
  Psych: {
    primary: c.purple,
    secondary: c.mustard,
    primaryBackground: c.greenBean,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.mustard,
  },
  Pop: {
    primary: c.neonBlue,
    secondary: c.violet,
    primaryBackground: c.pink,
    secondaryBackground: c.lightGray,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sunscreen,
  },
  Surf: {
    primary: c.oceanBlue,
    secondary: c.sunset,
    primaryBackground: c.sunscreen,
    secondaryBackground: c.sand,
    primaryText: c.black,
    headerText: c.black,
    highlight: c.sand,
  },
};

export default themes;
