import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { MessageIntent } from '@src/components/common/enums';

const ConnectionSuccessScreen = () => (
  <ComposerMessage messageIntent={MessageIntent.DROPBOX_CONNECTION_SUCCESS} />
);

export default ConnectionSuccessScreen;
