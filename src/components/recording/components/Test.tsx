import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
// import {
//   Gesture,
//   GestureDetector,
//   GestureUpdateEvent,
//   PanGestureChangeEventPayload,
//   PanGestureHandlerEventPayload,
// } from 'react-native-gesture-handler';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  cancelAnimation,
  // runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import {
  PLAYBACK_START_DELAY,
  // PAN_SENSITIVITY,
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectIsPlaying,
  selectPlaybackDuration,
} from '@src/state/selectors/playbackSelector';
import RecordingWave from '../subcomponents/RecordingWave';
// import { useAudioPlayer } from '@src/state/context/AudioContext';

interface Props {
  isRecording: boolean;
  fullWave: number[];
  displayWave: number[];
  isPlaying: boolean;
}

const Test = React.memo((props: Props) => {
  const { isRecording, fullWave, displayWave, isPlaying } = props;
  const styles = useAudioWaveStyles();
  const prevWave = useRef(fullWave);
  // const isPlaying = useAppSelector(selectIsPlaying);
  // const duration = useAppSelector(selectPlaybackDuration);
  const duration = 9;

  const memoizedWaveForms = useMemo(() => {
    return <WaveForms waveForms={isRecording ? displayWave : fullWave} />;
  }, [isRecording]);

  const progress = useSharedValue(0);
  const manualPanX = useSharedValue(0);
  const isPlayingShared = useSharedValue(false);
  const durationShared = useSharedValue(duration || 1);
  const isRecordingShared = useSharedValue(isRecording);
  const hasReachedEnd = useSharedValue(false);

  const waveformWidth = useDerivedValue(() =>
    isRecording
      ? displayWave.length * WAVE_BAR_TOTAL_WIDTH
      : fullWave.length * WAVE_BAR_TOTAL_WIDTH,
  );

  const panX = useDerivedValue(() => {
    if (isRecordingShared.value) {
      return manualPanX.value;
    }

    return progress.value * -waveformWidth.value;
  });

  const resetWaveformPosition = useCallback(() => {
    progress.value = 0;
    manualPanX.value = 0;
  }, [progress, manualPanX]);

  useEffect(() => {
    durationShared.value = duration || 1;
    isPlayingShared.value = isPlaying;
    isRecordingShared.value = isRecording;

    if (isPlaying && hasReachedEnd.value) {
      progress.value = 0;
      hasReachedEnd.value = false;
    }
  }, [duration, isPlaying, isRecording]);

  useAnimatedReaction(
    () => isPlayingShared.value,
    (isAnimatedPlaying: boolean) => {
      if (isAnimatedPlaying && !isRecordingShared.value) {
        const startProgress = progress.value;
        const startTime = Date.now();

        const animate = () => {
          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < PLAYBACK_START_DELAY) {
            requestAnimationFrame(animate);
            return;
          }

          const adjustedElapsedTime =
            (elapsedTime - PLAYBACK_START_DELAY) / 1000;
          progress.value =
            startProgress + adjustedElapsedTime / durationShared.value;

          if (progress.value >= 1) {
            progress.value = 1;
            hasReachedEnd.value = true;
            return;
          }

          if (progress.value < 1 && isPlayingShared.value) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      } else {
        cancelAnimation(progress);
      }
    },
    [isPlayingShared, durationShared, isRecordingShared],
  );

  useAnimatedReaction(
    () => waveformWidth.value,
    () => {
      if (isRecording) {
        manualPanX.value = WAVE_CONTAINER_WIDTH - waveformWidth.value;
      }
    },
    [isRecording],
  );

  useEffect(() => {
    if (fullWave.length === 0 && prevWave.current.length > 0) {
      resetWaveformPosition();
    }
    prevWave.current = fullWave;
  }, [fullWave]);

  const maskAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: panX.value }] };
  });

  const playedAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: isRecording ? 0 : -panX.value,
    };
  });

  const maskedElement = (
    <Animated.View
      style={[
        isRecording
          ? styles.maskElementContainer
          : styles.maskElementContainerNotRecording,
        maskAnimatedStyle,
      ]}
    >
      {fullWave.length > 0 && memoizedWaveForms}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        {/* <GestureDetector gesture={panGestureHandler}> */}
        {isRecording ? (
          <RecordingWave recordingWave={displayWave} />
        ) : (
          <MaskedView style={styles.maskedView} maskElement={maskedElement}>
            <Animated.View
              style={[styles.playedSection, playedAnimatedStyle]}
            />
            <View style={styles.unplayedSection} />
          </MaskedView>
        )}
        {/* </GestureDetector> */}
      </View>
      {!isRecording && fullWave.length > 0 && (
        <View style={styles.midpointLine} />
      )}
    </View>
  );
});

export default Test;
