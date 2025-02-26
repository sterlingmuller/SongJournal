import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

const Timer = () => {
  const styles = useRecordingStyles();
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
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formattedElapsedTime}</StyledText>
    </View>
  );
};

export default React.memo(Timer);
