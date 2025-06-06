import { requireNativeView } from 'expo';
import * as React from 'react';

import { TestttViewProps } from './Testtt.types';

const NativeView: React.ComponentType<TestttViewProps> =
  requireNativeView('Testtt');

export default function TestttView(props: TestttViewProps) {
  return <NativeView {...props} />;
}
