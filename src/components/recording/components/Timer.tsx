import React, { useEffect, useRef, useState } from 'react';
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
  const { duration, isPlaying } = useAppSelector(selectPlaybackInfo);

  const [displayTime, setDisplayTime] = useState(null);
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(0);
  const finalTimeRef = useRef(0);

  useEffect(() => {
    if (isRecording || isPlaying) {
      startTimeRef.current = Date.now() - displayTime * 1000;

      const updateTimer = () => {
        let newTime: number;
        if (isRecording) {
          newTime = recordingDuration;
        } else {
          newTime = (Date.now() - startTimeRef.current) / 1000;
          if (duration) {
            newTime = Math.min(newTime, duration);
          }
        }

        setDisplayTime(newTime);
        finalTimeRef.current = newTime;

        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };

      updateTimer();
    } else {
      cancelAnimationFrame(animationFrameRef.current);
      if (!isRecording && finalTimeRef.current > 0) {
        setDisplayTime(finalTimeRef.current);
      }
    }

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isRecording, isPlaying, recordingDuration, duration]);

  // This nulls display correctly on clear however, for some reason the displayTime now isn't updating while playing
  useEffect(() => {
    if (!isPlaying && !isRecording && !recordingDuration) {
      setDisplayTime(null);
      finalTimeRef.current = 0;
    }
  }, [recordingDuration]);

  useEffect(() => {
    if (isRecording) {
      setDisplayTime(recordingDuration);
    }
  }, [isRecording, recordingDuration]);

  return (
    <View style={styles.timerContainer}>
      <StyledText style={styles.timer}>
        {formatDuration(displayTime)}
      </StyledText>
    </View>
  );
};

export default Timer;
