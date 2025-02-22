import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import { DOT_HEIGHT, WAVE_BAR_WIDTH } from '@src/components/common/constants';

interface Props {
  waveForms: number[];
}

const WaveForms = ({ waveForms }: Props) => {
  const styles = useAudioWaveStyles();

  const mapBars = waveForms.map((waveHeight: number, index: number) => (
    <View style={styles.waveColumn} key={index}>
      <View style={styles.topWaveContainer}>
        {waveHeight < 39 ? (
          <View style={[styles.dot, { height: WAVE_BAR_WIDTH }]} />
        ) : (
          <View style={[styles.bar, { height: `${waveHeight}%` }]} />
        )}
      </View>
      <View style={styles.bottomWaveContainer}>
        {waveHeight < 39 ? (
          <View style={[styles.dot, { height: DOT_HEIGHT }]} />
        ) : (
          <View style={[styles.bar, { height: `${waveHeight}%` }]} />
        )}
      </View>
    </View>
  ));

  return <View style={[styles.waveformContainer]}>{mapBars}</View>;
};

export default React.memo(WaveForms);
