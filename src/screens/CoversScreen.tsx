import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { MessageIntent } from '@src/components/common/enums';

const CoversScreen = () => (
  <ComposerMessage messageIntent={MessageIntent.HIDE_COVERS_SCREEN} />
);

export default CoversScreen;
