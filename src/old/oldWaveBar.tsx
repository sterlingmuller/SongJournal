import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import { AUDIO_WAVE_MIDPOINT } from '@src/components/common/constants';

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
          height: waveHeight,
          backgroundColor:
            index < AUDIO_WAVE_MIDPOINT || isRecording ? '#ff4081' : '#3f51b5',
        },
      ]}
    />
  );
};

export default WaveBar;
