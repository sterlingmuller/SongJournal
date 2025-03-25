import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { MessageIntent } from '@src/components/common/enums';

const SetlistScreen = () => (
  <ComposerMessage messageIntent={MessageIntent.HIDE_SETLIST_SCREEN} />
);

export default SetlistScreen;
