import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { useRecording } from '@src/state/context/RecordingContext';

const RecordingPlaybackTimer = () => {
  const timerStyles = useRecordingStyles();
  const { currentTime } = useAudioPlayer();
  const { duration } = useRecording();

  const displayTime = currentTime ? currentTime : duration;

  return (
    <View style={timerStyles.timerContainer}>
      <StyledText style={timerStyles.timer}>
        {formatDuration(displayTime)}
      </StyledText>
    </View>
  );
};

export default React.memo(RecordingPlaybackTimer);
