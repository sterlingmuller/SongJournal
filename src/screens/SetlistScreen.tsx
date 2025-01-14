import React from 'react';

import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { Screen } from '@src/components/common/enums';

const SetlistScreen = () => <ComposerMessage screen={Screen.SETLIST} />;

export default SetlistScreen;
