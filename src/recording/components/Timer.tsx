import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';

interface Props {
  duration: number;
}

const Timer = ({ duration }: Props) => {
  const formattedTime = formatDuration(duration);
  const styles = useRecordingStyles();

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formattedTime}</StyledText>
    </View>
  );
};

export default Timer;
