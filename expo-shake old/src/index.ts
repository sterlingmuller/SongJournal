import { EventSubscription } from 'expo-modules-core';
import ExpoShakeModule from './ExpoShakeModule';

export type ShakeEvent = {
  timestamp: number;
};

export function addShakeListener(listener: (event: ShakeEvent) => void): EventSubscription {
  return ExpoShakeModule.addListener('onShake', listener);
}

export function startShakeDetection(): void {
  return ExpoShakeModule.startShakeDetection();
}

export function stopShakeDetection(): void {
  return ExpoShakeModule.stopShakeDetection();
}