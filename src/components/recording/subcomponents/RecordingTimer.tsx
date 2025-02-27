import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useRecording } from '@src/state/context/RecordingContext';

const RecordingTimer = () => {
  const styles = useRecordingStyles();
  const { recordingDurationShared, duration } = useRecording();
  const [ellapsedTime, setEllapsedTime] = useState(duration);

  useAnimatedReaction(
    () => {
      return recordingDurationShared.value;
    },
    (currentValue: number, previousValue: number) => {
      if (currentValue !== previousValue) {
        runOnJS(setEllapsedTime)(currentValue);
      }
    },
    [recordingDurationShared],
  );

  const formattedEllapsedTime = useMemo(
    () => formatDuration(ellapsedTime),
    [ellapsedTime],
  );

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formattedEllapsedTime}</StyledText>
    </View>
  );
};

export default React.memo(RecordingTimer);
