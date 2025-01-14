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
  secondaryText: string;
  headerText: string;
  highlight: string;
  conductorBackground: string;
  settingsEmphasis: string;
  error: string;
  hyperlink: string;
}

type ThemeKey = 'Light' | 'Dark' | 'Metal' | 'Psych' | 'Pop' | 'Surf';

const themes: Record<ThemeKey, Theme> = {
  Light: {
    primary: c.coral,
    mutedPrimary: getColorWithOpacity(c.coral, 60),
    secondary: c.gold,
    primaryBackground: c.cream,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    headerText: c.black,
    highlight: c.gray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.sunset,
    hyperlink: c.blue,
  },
  Dark: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    clearBackground: c.white,
    primaryText: c.dimWhite,
    secondaryText: c.darkGray,
    headerText: c.dimWhite,
    highlight: c.charcoal,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
  },
  Metal: {
    primary: c.bloodRed,
    mutedPrimary: getColorWithOpacity(c.bloodRed, 60),
    secondary: c.dimGold,
    primaryBackground: c.lightBlack,
    secondaryBackground: c.charcoal,
    clearBackground: c.white,
    primaryText: c.bloodRed,
    secondaryText: c.darkGray,
    headerText: c.dimGold,
    highlight: c.charcoal,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    hyperlink: c.blue,
  },
  Psych: {
    primary: c.purple,
    mutedPrimary: getColorWithOpacity(c.purple, 60),
    secondary: c.mustard,
    primaryBackground: c.greenBean,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    headerText: c.black,
    highlight: c.mustard,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
  },
  Pop: {
    primary: c.neonBlue,
    mutedPrimary: getColorWithOpacity(c.neonBlue, 60),
    secondary: c.violet,
    primaryBackground: c.pink,
    secondaryBackground: c.lightGray,
    clearBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    headerText: c.black,
    highlight: c.sunscreen,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
  },
  Surf: {
    primary: c.oceanBlue,
    mutedPrimary: getColorWithOpacity(c.oceanBlue, 60),
    secondary: c.sunset,
    primaryBackground: c.sunscreen,
    secondaryBackground: c.sand,
    clearBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    headerText: c.black,
    highlight: c.sand,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
  },
};

export default themes;
