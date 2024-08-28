import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import usePlaybackBarStyles from '@src/styles/playbackBar';
import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  duration: number;
}

const PlaybackBar = ({ duration }: Props) => {
  const styles = usePlaybackBarStyles();
  const { currentTime, seekTo } = useAudioPlayer();
  const { theme } = useColorTheme();

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
      <View style={styles.sliderContainer}>
        <Slider
          containerStyle={{ borderRadius: 8 }}
          renderBubble={() => null}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          onValueChange={(time: number) => {
            seekTo(time);
          }}
          thumbWidth={25}
          theme={{
            minimumTrackTintColor: theme.primary,
            maximumTrackTintColor: theme.secondary,
            heartbeatColor: theme.highlight,
          }}
          sliderHeight={15}
          heartbeat
        />
      </View>
      <View style={styles.timeContainer}>
        <StyledText style={styles.timeText}>
          {formatDuration(currentTime)}
        </StyledText>
      </View>
    </View>
  );
};

export default PlaybackBar;
