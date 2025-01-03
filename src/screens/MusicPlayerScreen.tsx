import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { Screen } from '@src/components/common/enums';

const MusicPlayerScreen = () => (
  <ComposerMessage screen={Screen.MUSIC_PLAYER} />
);

export default MusicPlayerScreen;
