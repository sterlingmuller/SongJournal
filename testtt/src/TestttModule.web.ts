import { registerWebModule, NativeModule } from 'expo';

import { TestttModuleEvents } from './Testtt.types';

class TestttModule extends NativeModule<TestttModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(TestttModule, 'TestttModule');
