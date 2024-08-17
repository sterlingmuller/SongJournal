import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveBar from '../subcomponents/WaveBar';
import { SCREEN_WIDTH } from '@src/common/constants';
import { selectIsPlaying } from '@src/selectors/playbackSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';

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
      {!isRecording && (
        <View
          style={[
            styles.midpointLine,
            { left: (SCREEN_WIDTH * 0.7) / 2 }, // Assuming the wave container is 80% of screen width
          ]}
        />
      )}
    </View>
  );
};

export default AudioWaveDisplay;
