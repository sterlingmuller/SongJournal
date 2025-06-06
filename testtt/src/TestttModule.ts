import { NativeModule, requireNativeModule } from 'expo';

import { TestttModuleEvents } from './Testtt.types';

declare class TestttModule extends NativeModule<TestttModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<TestttModule>('Testtt');
