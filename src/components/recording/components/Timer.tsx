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
  const { duration, isPlaying, playbackTime } =
    useAppSelector(selectPlaybackInfo);

  const [displayTime, setDisplayTime] = useState(null);
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(0);
  const finalTimeRef = useRef(0);

  // Timer works for now but there is a delay going from 0 to 1
  // improve this in the future to use the useTimer hook so we're getting playbackTime from
  // the timer, not recording status => state => component

  // useEffect(() => {
  //   if (isRecording || isPlaying) {
  //     startTimeRef.current = Date.now() - displayTime * 1000;

  //     const updateTimer = () => {
  //       let newTime: number;
  //       if (isRecording) {
  //         newTime = recordingDuration;
  //       } else {
  //         newTime = (Date.now() - startTimeRef.current) / 1000;
  //         if (duration) {
  //           newTime = Math.min(newTime, duration);
  //         }
  //       }

  //       setDisplayTime(newTime);
  //       finalTimeRef.current = newTime;

  //       animationFrameRef.current = requestAnimationFrame(updateTimer);
  //     };

  //     updateTimer();
  //   } else {
  //     cancelAnimationFrame(animationFrameRef.current);
  //     if (!isRecording && finalTimeRef.current > 0) {
  //       setDisplayTime(finalTimeRef.current);
  //     }
  //   }

  //   return () => cancelAnimationFrame(animationFrameRef.current);
  // }, [isRecording, isPlaying, recordingDuration, duration]);

  useEffect(() => {
    if (isPlaying) {
      setDisplayTime(playbackTime);
    }
  }, [isPlaying, playbackTime]);

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
