import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useRecording } from '@src/state/context/RecordingContext';

const RecordingTimer = () => {
  const styles = useRecordingStyles();
  const { duration } = useRecording();

  const displayTime = duration || 0;

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>
        {formatDuration(displayTime)}
      </StyledText>
    </View>
  );
};

export default RecordingTimer;
