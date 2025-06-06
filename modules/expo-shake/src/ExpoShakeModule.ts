import { requireNativeModule, EventSubscription } from 'expo-modules-core';

interface ExpoShakeModuleInterface {
  startShakeDetection(): void;
  stopShakeDetection(): void;
  addListener(eventName: 'onShake', listener: () => void): EventSubscription;
  removeListeners(count: number): void;
}

export default requireNativeModule<ExpoShakeModuleInterface>('ExpoShake');
