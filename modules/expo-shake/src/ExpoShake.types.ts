import { EventSubscription } from 'expo-modules-core';
import ExpoShakeModule from './ExpoShakeModule';

export function addShakeListener(listener: () => void): EventSubscription {
  return ExpoShakeModule.addListener('onShake', listener);
}

export function startShakeDetection(): void {
  return ExpoShakeModule.startShakeDetection();
}

export function stopShakeDetection(): void {
  return ExpoShakeModule.stopShakeDetection();
}