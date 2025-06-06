import { EventSubscription } from 'expo-modules-core';
import ExpoShakeModule from './src/ExpoShakeModule';

export const addShakeListener = (listener: () => void): EventSubscription => {
  return ExpoShakeModule.addListener('onShake', listener);
}

export const startShakeDetection = () => {
  ExpoShakeModule.startShakeDetection();
}

export const stopShakeDetection = () => {
  ExpoShakeModule.stopShakeDetection();
}
