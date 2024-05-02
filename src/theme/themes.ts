import { colorThemeName } from '@src/common/types';

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  button: string;
  buttonText: string;
  header: string;
}

const themes: Record<colorThemeName, Theme> = {
  Light: {
    primary: '#ffffff',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#eeeeee',
    buttonText: '#333333',
    header: 'coral',
  },
  Dark: {
    primary: '#333333',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#222222',
    buttonText: '#ffffff',
    header: 'gray',
  },
  Metal: {
    primary: '#ff4081',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
  Psych: {
    primary: '#ff4081',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#cddc39',
    buttonText: '#212121',
    header: 'green',
  },
  Pop: {
    primary: '#ff4081',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
  Twee: {
    primary: '#ff4081',
    secondary: '#fff',
    accent: '#fcd470',
    button: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
};

export default themes;
