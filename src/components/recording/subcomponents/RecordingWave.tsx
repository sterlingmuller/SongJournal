import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import {
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';
import useAudioWaveStyles from '@src/styles/audioWave';

interface Props {
  recordingWave: number[];
}

const RecordingWave = ({ recordingWave }: Props) => {
  const styles = useAudioWaveStyles();

  const animatedStyle = useAnimatedStyle(() => {
    const waveformWidth = recordingWave.length * WAVE_BAR_TOTAL_WIDTH;
    const translateX = Math.min(0, WAVE_CONTAINER_WIDTH - waveformWidth);
    return { transform: [{ translateX }] };
  }, [recordingWave]);

  return (
    <Animated.View style={[styles.maskElementContainer, animatedStyle]}>
      <WaveForms waveForms={recordingWave} />
    </Animated.View>
  );
};

export default React.memo(RecordingWave);
