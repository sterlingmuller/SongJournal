import * as React from 'react';

import { TestttViewProps } from './Testtt.types';

export default function TestttView(props: TestttViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
