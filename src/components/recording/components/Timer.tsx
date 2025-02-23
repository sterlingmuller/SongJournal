import React, { useMemo } from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectPlaybackInfo } from '@src/state/selectors/playbackSelector';
interface Props {
  time: number;
  isRecording: boolean;
}

const Timer = ({ time, isRecording }: Props) => {
  const styles = useRecordingStyles();
  const { isPlaying, playbackTime } = useAppSelector(selectPlaybackInfo);

  const displayTime = useMemo(() => {
    if (isRecording) return time;
    if (isPlaying) return playbackTime;
    if (!isPlaying && !isRecording && !time) return null;
    return time;
  }, [isRecording, isPlaying, time, playbackTime]);

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>
        {formatDuration(displayTime)}
      </StyledText>
    </View>
  );
};

export default React.memo(Timer);
