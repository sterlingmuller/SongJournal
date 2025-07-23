import { NativeModules, NativeEventEmitter } from 'react-native';

const { ShakeModule } = NativeModules;
const shakeEmitter = new NativeEventEmitter(ShakeModule);

const ShakeModuleWrapper = {
  start: () => {
    ShakeModule.startShakeDetection();
  },
  stop: () => {
    ShakeModule.stopShakeDetection();
  },
  addListener: (callback: (event: any) => void) => {
    return shakeEmitter.addListener('shakeDetected', callback);
  },
  removeListener: (listener: any) => {
    listener.remove();
  },
};

export default ShakeModuleWrapper;
