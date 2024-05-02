import React from 'react';
import { View } from 'react-native';

import useSongFolderStyles from '@styles/songFolder';

const PlaybackBar = () => {
  const styles = useSongFolderStyles();

  return <View style={styles.playbackBar} />;
};

export default PlaybackBar;
