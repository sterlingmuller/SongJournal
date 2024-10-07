import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  cancelAnimation,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import {
  PAN_SENSITIVITY,
  WAVE_BAR_GAP,
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_BAR_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectPlaybackInfo } from '@src/state/selectors/playbackSelector';
import { useAudioPlayer } from '@src/state/context/AudioContext';

interface Props {
  isRecording: boolean;
  wave: number[];
}

const AudioWaveDisplay = (props: Props) => {
  const { isRecording, wave } = props;
  const styles = useAudioWaveStyles();
  const sliding = useSharedValue(false);
  const wasRecording = useRef(false);
  const prevIsRecording = useRef(isRecording);
  const prevWave = useRef(wave);
  const { isPlaying, playbackTime, duration } =
    useAppSelector(selectPlaybackInfo);
  const { seekTo } = useAudioPlayer();

  const findNearestMultiple = (n: number, multiple: number) => {
    'worklet';
    return Math.floor(n / multiple) * multiple;
  };

  const progress = useSharedValue(0);
  const manualPanX = useSharedValue(0);
  const isPlayingShared = useSharedValue(false);
  const durationShared = useSharedValue(duration || 1);
  const isRecordingShared = useSharedValue(isRecording);
  const hasReachedEnd = useSharedValue(false);

  const PLAYBACK_START_DELAY = 100;

  const waveformWidth = useDerivedValue(
    () => wave.length * WAVE_BAR_TOTAL_WIDTH,
  );
  const maxPanX = useDerivedValue(() => -waveformWidth.value);
  const panX = useDerivedValue(() => {
    if (isRecordingShared.value) {
      return manualPanX.value;
    }
    return progress.value * maxPanX.value;
  });

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
    (isPlaying: boolean) => {
      if (isPlaying && !isRecordingShared.value) {
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

  const resetWaveformPosition = () => {
    manualPanX.value = withTiming(0, { duration: 300 });
  };

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
    if (!isRecording && prevIsRecording.current) {
      resetWaveformPosition();
    }
    prevIsRecording.current = isRecording;
  }, [isRecording]);

  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      sliding.value = true;
      cancelAnimation(panX);
    })
    .onChange(
      (
        event: GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >,
      ) => {
        if (!isRecording) {
          const translation = event.translationX * PAN_SENSITIVITY;
          const nextPanX = panX.value + translation;

          panX.value = Math.max(maxPanX.value, Math.min(0, nextPanX));
        }
      },
    )
    .onFinalize(() => {
      if (!isRecording) {
        panX.value = withTiming(
          findNearestMultiple(panX.value, WAVE_BAR_TOTAL_WIDTH),
        );
        sliding.value = false;

        const scrollableWidth = waveformWidth.value - WAVE_CONTAINER_WIDTH;
        const newProgress = -panX.value / scrollableWidth;
        const newTime = newProgress * duration;
        runOnJS(seekTo)(newTime);
      }
    });

  useEffect(() => {
    if (wave.length === 0 && prevWave.current.length > 0) {
      resetWaveformPosition();
    }
    prevWave.current = wave;
  }, [wave]);

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
      {wave.length > 0 && <WaveForms waveForms={wave} />}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <GestureDetector gesture={panGestureHandler}>
          <MaskedView style={styles.maskedView} maskElement={maskedElement}>
            <Animated.View
              style={[styles.playedSection, playedAnimatedStyle]}
            />
            <View style={styles.unplayedSection} />
          </MaskedView>
        </GestureDetector>
      </View>
      {!isRecording && <View style={styles.midpointLine} />}
    </View>
  );
};

export default AudioWaveDisplay;
