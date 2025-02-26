import React, { useMemo } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';

interface Props {
  time: number;
}

const RecordingTimer = ({ time }: Props) => {
  const styles = useRecordingStyles();

  const formattedDuration = useMemo(() => formatDuration(time), [time]);

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{formattedDuration}</StyledText>
    </View>
  );
};

export default React.memo(RecordingTimer);
