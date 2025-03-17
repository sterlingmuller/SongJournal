import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import useRecordingStyles from '@src/styles/recording';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { useRecording } from '@src/state/context/RecordingContext';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import usePlaybackTimer from '@src/hooks/usePlaybackTimer';

const RecordingPlaybackTimer = () => {
  const timerStyles = useRecordingStyles();
  const { soundRef } = useAudioPlayer();
  const { duration } = useRecording();
  const isPlaying = useAppSelector(selectIsPlaying);

  const currentTime = usePlaybackTimer(soundRef, isPlaying);
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
