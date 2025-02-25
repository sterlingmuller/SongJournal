import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import usePlaybackBarStyles from '@src/styles/playbackBar';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

const PlaybackDuration = () => {
  const styles = usePlaybackBarStyles();
  const { currentTime } = useAudioPlayer();
  const [elapsedTime, setElapsedTime] = useState(0);

  useAnimatedReaction(
    () => {
      return currentTime.value;
    },
    (currentValue: number, previousValue: number) => {
      if (currentValue !== previousValue) {
        runOnJS(setElapsedTime)(currentValue);
      }
    },
    [currentTime],
  );

  const formattedElapsedTime = useMemo(
    () => formatDuration(elapsedTime),
    [elapsedTime],
  );

  return (
    <View style={styles.timeContainer}>
      <StyledText style={styles.timeText}>{formattedElapsedTime}</StyledText>
    </View>
  );
};

export default React.memo(PlaybackDuration);
