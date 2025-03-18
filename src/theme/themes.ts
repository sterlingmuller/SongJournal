import { colors as c } from '@src/theme/colors';
import { getColorWithOpacity } from '@src/utils/getColorWithOpacity';

export interface Theme {
  primary: string;
  mutedPrimary: string;
  secondary: string;
  primaryBackground: string;
  secondaryBackground: string;
  inputBackground: string;
  primaryText: string;
  secondaryText: string;
  placeholderText: string;
  tipText: string;
  secondaryTipText: string;
  footerText: string;
  highlight: string;
  conductorBackground: string;
  settingsEmphasis: string;
  error: string;
  hyperlink: string;
  toggleOn: string;
  toggleShadow: string;
}

type ThemeKey = 'Light' | 'Dark' | 'Metal' | 'Psych' | 'Pop' | 'Surf';

const themes: Record<ThemeKey, Theme> = {
  Light: {
    primary: c.coral,
    mutedPrimary: getColorWithOpacity(c.coral, 60),
    secondary: c.gold,
    primaryBackground: c.cream,
    inputBackground: c.lightGray,
    secondaryBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    footerText: c.darkGray,
    placeholderText: c.gray,
    tipText: c.coral,
    secondaryTipText: c.coral,
    highlight: c.gray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.sunset,
    hyperlink: c.blue,
    toggleOn: c.coral,
    toggleShadow: getColorWithOpacity(c.coral, 60),
  },
  Dark: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.charcoal,
    inputBackground: c.sandyGray,
    secondaryBackground: c.lightBlack,
    primaryText: c.dimWhite,
    secondaryText: c.lightBlack,
    footerText: c.sandyGray,
    placeholderText: c.darkGray,
    tipText: c.dimGold,
    secondaryTipText: c.lightBlack,
    highlight: c.darkGray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
    toggleOn: c.dimGold,
    toggleShadow: getColorWithOpacity(c.dimGold, 60),
  },
  Surf: {
    primary: c.oceanBlue,
    mutedPrimary: getColorWithOpacity(c.oceanBlue, 60),
    secondary: c.sunset,
    primaryBackground: c.sunscreen,
    inputBackground: c.sand,
    secondaryBackground: c.white,
    primaryText: c.black,
    secondaryText: c.darkGray,
    footerText: c.darkGray,
    placeholderText: c.darkGray,
    tipText: c.sand,
    secondaryTipText: c.sand,
    highlight: c.sand,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
    toggleOn: c.oceanBlue,
    toggleShadow: getColorWithOpacity(c.oceanBlue, 60),
  },
  Metal: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.charcoal,
    inputBackground: c.sandyGray,
    secondaryBackground: c.lightBlack,
    primaryText: c.dimWhite,
    secondaryText: c.lightBlack,
    footerText: c.sandyGray,
    placeholderText: c.darkGray,
    tipText: c.dimGold,
    secondaryTipText: c.lightBlack,
    highlight: c.darkGray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
    toggleOn: c.dimGold,
    toggleShadow: getColorWithOpacity(c.dimGold, 60),
  },
  Psych: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.charcoal,
    inputBackground: c.sandyGray,
    secondaryBackground: c.lightBlack,
    primaryText: c.dimWhite,
    secondaryText: c.lightBlack,
    footerText: c.sandyGray,
    placeholderText: c.darkGray,
    tipText: c.dimGold,
    secondaryTipText: c.lightBlack,
    highlight: c.darkGray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
    toggleOn: c.dimGold,
    toggleShadow: getColorWithOpacity(c.dimGold, 60),
  },
  Pop: {
    primary: c.deepCharcoal,
    mutedPrimary: getColorWithOpacity(c.deepCharcoal, 60),
    secondary: c.dimGold,
    primaryBackground: c.charcoal,
    inputBackground: c.sandyGray,
    secondaryBackground: c.lightBlack,
    primaryText: c.dimWhite,
    secondaryText: c.lightBlack,
    footerText: c.sandyGray,
    placeholderText: c.darkGray,
    tipText: c.dimGold,
    secondaryTipText: c.lightBlack,
    highlight: c.darkGray,
    conductorBackground: c.salmon,
    settingsEmphasis: c.teal,
    error: c.maroon,
    hyperlink: c.blue,
    toggleOn: c.dimGold,
    toggleShadow: getColorWithOpacity(c.dimGold, 60),
  },
};

export default themes;
