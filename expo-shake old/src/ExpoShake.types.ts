import { EventSubscription } from 'expo-modules-core';
import ExpoSettingsModule from './ExpoShakeModule';

export type ThemeChangeEvent = {
  theme: string;
};

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): EventSubscription {
  return ExpoSettingsModule.addListener('onChangeTheme', listener);
}

// export function addShakeListener(listener: () => void): EventSubscription {
//   return ExpoShakeModule.addListener('onShake', listener);
// }