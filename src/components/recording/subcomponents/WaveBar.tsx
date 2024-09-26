import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';

interface Props {
  waveHeight: number;
  index: number;
}

const WaveBar = ({ waveHeight, index }: Props) => {
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
          height: waveHeight,
        },
      ]}
    />
  );
};

export default WaveBar;
