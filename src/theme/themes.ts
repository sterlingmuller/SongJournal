import { colorThemeName } from '@src/common/types';

export interface Theme {
  primary: string;
  secondary: string;
  buttonColor: string;
  buttonText: string;
  header: string;
}

const themes: Record<colorThemeName, Theme> = {
  Light: {
    primary: '#ffffff',
    secondary: '#fcd470',
    buttonColor: '#eeeeee',
    buttonText: '#333333',
    header: 'yellow',
  },
  Dark: {
    primary: '#333333',
    secondary: '#fcd470',
    buttonColor: '#222222',
    buttonText: '#ffffff',
    header: 'gray',
  },
  Metal: {
    primary: '#ff4081',
    secondary: '#fcd470',
    buttonColor: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
  Psych: {
    primary: '#ff4081',
    secondary: '#fcd470',
    buttonColor: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
  Pop: {
    primary: '#ff4081',
    secondary: '#fcd470',
    buttonColor: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
  Twee: {
    primary: '#ff4081',
    secondary: '#fcd470',
    buttonColor: '#cddc39',
    buttonText: '#212121',
    header: 'pink',
  },
};

export default themes;
