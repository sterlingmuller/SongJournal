import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { Screen } from '@src/components/common/enums';

const ConnectionSuccessScreen = () => (
  <ComposerMessage screen={Screen.CONNECTION_SUCCESS} />
);

export default ConnectionSuccessScreen;
