import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectPlaybackInfo } from '@src/state/selectors/playbackSelector';

interface Props {
  recordingDuration: number;
  isRecording: boolean;
}

const Timer = ({ recordingDuration, isRecording }: Props) => {
  const styles = useRecordingStyles();
  const { playbackTime, duration, isPlaying } =
    useAppSelector(selectPlaybackInfo);

  const displayTime = () => {
    if (isRecording) {
      return formatDuration(recordingDuration || 0);
    } else if (isPlaying || playbackTime > 0) {
      return formatDuration(playbackTime);
    } else {
      return formatDuration(duration || 0);
    }
  };

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>{displayTime()}</StyledText>
    </View>
  );
};

export default Timer;
