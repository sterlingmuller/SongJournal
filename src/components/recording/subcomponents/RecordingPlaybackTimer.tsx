import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useRecording } from '@src/state/context/RecordingContext';

const RecordingPlaybackTimer = () => {
  const styles = useRecordingStyles();
  const { currentTime } = useAudioPlayer();
  const { duration } = useRecording();
  const [elapsedTime, setElapsedTime] = useState(duration);

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

  const formattedElapsedTime = useMemo(() => {
    if (elapsedTime) return formatDuration(elapsedTime);
    return formatDuration(duration);
  }, [elapsedTime]);

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formattedElapsedTime}</StyledText>
    </View>
  );
};

export default React.memo(RecordingPlaybackTimer);
