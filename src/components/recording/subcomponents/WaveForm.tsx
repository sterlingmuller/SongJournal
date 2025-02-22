import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import { WAVE_BAR_WIDTH } from '@src/components/common/constants';

interface Props {
  waveForms: number[];
}

const WaveForms = ({ waveForms }: Props) => {
  const styles = useAudioWaveStyles();

  // console.log('waveForms:', waveForms);

  const mapBars = waveForms.map((waveHeight: number, index: number) =>
    waveHeight < 39 ? (
      <View style={styles.waveColumn} key={index}>
        <View style={styles.topWaveContainer}>
          <View key={index} style={[styles.dot, { height: WAVE_BAR_WIDTH }]} />
        </View>
        <View style={styles.bottomWaveContainer}>
          <View
            key={index}
            style={[styles.dot, { height: WAVE_BAR_WIDTH * 0.75 }]}
          />
        </View>
      </View>
    ) : (
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
    ),
  );

  return <View style={[styles.waveformContainer]}>{mapBars}</View>;
};

export default WaveForms;
