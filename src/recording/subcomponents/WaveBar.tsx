import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';

interface Props {
  waveHeight: number;
  index: number;
  isRecording: boolean;
}

const WaveBar = ({ waveHeight, index, isRecording }: Props) => {
  const styles = useAudioWaveStyles();

  if (waveHeight === null) {
    return (
      <View key={index} style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
    );
  }
  return (
    <View
      key={index}
      style={[
        styles.bar,
        {
          height: waveHeight * 2,
          backgroundColor: isRecording ? '#ff4081' : '#3f51b5',
        },
      ]}
    />
  );
};

export default WaveBar;
