import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';

interface Props {
  waveForms: number[];
}

const WaveForms = ({ waveForms }: Props) => {
  const styles = useAudioWaveStyles();

  return (
    <View style={[styles.waveformContainer]}>
      {waveForms.map((waveHeight: number, index: number) => (
        <View style={styles.waveColumn} key={index}>
          <View style={styles.topWaveContainer}>
            <View
              key={index}
              style={[styles.bar, { height: `${waveHeight}%` }]}
            />
          </View>
          <View style={styles.bottomWaveContainer}>
            <View
              key={index}
              style={[styles.bar, { height: `${waveHeight}%` }]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default WaveForms;
