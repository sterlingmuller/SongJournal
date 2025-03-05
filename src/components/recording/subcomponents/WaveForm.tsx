import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';

interface Props {
  waveForms: number[];
}

const Bar = React.memo(({ waveHeight }: { waveHeight: number }) => {
  const styles = useAudioWaveStyles();
  const dynamicStyles = styles.getDynamicStyles(waveHeight);

  return (
    <View style={styles.waveColumn}>
      <View style={styles.topWaveContainer}>
        {waveHeight < 0 ? (
          <View style={styles.dot} />
        ) : (
          <View style={dynamicStyles.bar} />
        )}
      </View>
      <View style={styles.bottomWaveContainer}>
        {waveHeight < 0 ? (
          <View style={styles.dot} />
        ) : (
          <View style={dynamicStyles.bar} />
        )}
      </View>
    </View>
  );
});

const WaveForms = ({ waveForms }: Props) => {
  const styles = useAudioWaveStyles();

  return (
    <View style={styles.waveformContainer}>
      {waveForms.map((waveHeight: number, index: number) => (
        <Bar key={index} waveHeight={waveHeight} />
      ))}
    </View>
  );
};

export default React.memo(WaveForms);
