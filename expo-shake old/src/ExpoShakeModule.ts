import { requireNativeModule } from 'expo-modules-core';

interface ExpoShakeModuleInterface {
  startShakeDetection(): void;
  stopShakeDetection(): void;
  addListener(eventName: 'onShake', listener: (event: { timestamp: number }) => void): void;
  removeListeners(count: number): void;
}

export default requireNativeModule<ExpoShakeModuleInterface>('ExpoShake');