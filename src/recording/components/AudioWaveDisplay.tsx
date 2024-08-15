import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveBar from '../subcomponents/WaveBar';
import useAudioWave from '@src/hooks/useAudioVisualizer';

interface Props {
  isRecording: boolean;
  wave: number[];
  setWave: (value: number[]) => void;
}

const AudioWaveDisplay = (props: Props) => {
  const { isRecording, wave, setWave } = props;
  const styles = useAudioWaveStyles();

  useAudioWave({ isRecording, setWave });

  return (
    <View style={styles.waveContainer}>
      {wave.map((waveHeight: number, index: number) => (
        <WaveBar
          waveHeight={waveHeight}
          index={index}
          isRecording={isRecording}
        />
      ))}
    </View>
  );
};

export default AudioWaveDisplay;
