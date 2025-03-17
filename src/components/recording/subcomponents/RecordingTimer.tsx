import React, { useEffect } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import useTimer from '@src/hooks/useTimer';

const RecordingTimer = () => {
  const styles = useRecordingStyles();
  const { duration, startTimer, resetTimer } = useTimer();

  useEffect(() => {
    startTimer();

    return () => {
      resetTimer();
    };
  }, []);

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formatDuration(duration)}</StyledText>
    </View>
  );
};

export default RecordingTimer;
