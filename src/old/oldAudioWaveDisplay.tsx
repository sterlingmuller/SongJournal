import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveBar from '@src/components/recording/subcomponents/WaveBar';

interface Props {
  isRecording: boolean;
  wave: number[];
}

const AudioWaveDisplay = (props: Props) => {
  const { isRecording, wave } = props;
  const styles = useAudioWaveStyles();

  return (
    <View style={styles.waveContainer}>
      {wave.map((waveHeight: number, index: number) => (
        <WaveBar
          key={index}
          waveHeight={waveHeight}
          index={index}
          isRecording={isRecording}
        />
      ))}
      {!isRecording && <View style={styles.midpointLine} />}
    </View>
  );
};

export default AudioWaveDisplay;
