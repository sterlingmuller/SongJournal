import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import {
  Easing,
  ReduceMotion,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import usePlaybackBarStyles from '@src/styles/playbackBar';
import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import { useAudioPlayer } from '@src/state/context/AudioContext';

interface Props {
  duration: number;
}

const PlaybackBar = ({ duration }: Props) => {
  const styles = usePlaybackBarStyles();
  const { currentTime, seekTo } = useAudioPlayer();

  const progress = useSharedValue(currentTime);
  const min = useSharedValue(0);
  const max = useSharedValue(duration);

  const smoothProgress = useDerivedValue(() => {
    return withTiming(currentTime, { duration: 100 });
  });

  useEffect(() => {
    progress.value = smoothProgress.value;
  }, [currentTime]);

  return (
    <View style={styles.container}>
      <Slider
        renderBubble={() => null}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onValueChange={(time: number) => {
          seekTo(time);
        }}
        thumbWidth={25}
        theme={{
          minimumTrackTintColor: '#ee865b',
          maximumTrackTintColor: '#d3d3d3',
          heartbeatColor: '#999',
        }}
        sliderHeight={15}
      />
      <View style={styles.timeContainer}>
        <StyledText style={styles.timeText}>
          {formatDuration(currentTime)}
        </StyledText>
        <StyledText style={styles.timeText}>
          {formatDuration(duration)}
        </StyledText>
      </View>
    </View>
  );
};

export default PlaybackBar;
