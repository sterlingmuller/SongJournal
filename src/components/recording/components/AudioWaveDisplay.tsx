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
  const panX = useSharedValue(0);
  const wasRecording = useRef(false);
  const prevIsRecording = useRef(isRecording);
  const prevWave = useRef(wave);
  const { isPlaying, playbackTime, duration } =
    useAppSelector(selectPlaybackInfo);
  const { seekTo } = useAudioPlayer();

  const waveformWidth = useDerivedValue(
    () => wave.length * WAVE_BAR_TOTAL_WIDTH,
  );
  const maxPanX = useDerivedValue(() => -waveformWidth.value);

  const findNearestMultiple = (n: number, multiple: number) => {
    'worklet';
    return Math.floor(n / multiple) * multiple;
  };

  // const progress = useSharedValue(0);

  const isPlayingRef = useRef(isPlaying);
  const isRecordingRef = useRef(isRecording);

  const playbackTimeShared = useSharedValue(0);
  const durationShared = useSharedValue(1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    playbackTimeShared.value = playbackTime;
  }, [playbackTime]);

  useEffect(() => {
    durationShared.value = duration || 1; // Fallback to 1 if duration is 0
  }, [duration]);

  const progress = useDerivedValue(() => {
    return playbackTimeShared.value / durationShared.value;
  });

  const updateProgress = useCallback(() => {
    'worklet';
    const newPanX = maxPanX.value * progress.value;

    console.log('newPanX:', newPanX);
    panX.value = withTiming(newPanX, { duration: 100 });
  }, [duration, playbackTime, progress]);

  const startInterval = useCallback(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        runOnUI(updateProgress)();
      }, 100);
    }
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !isRecording) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => stopInterval(); // Cleanup on unmount
  }, [isPlaying, isRecording, startInterval, stopInterval]);

  // const updateProgress = () => {
  //   'worklet';

  //   if (!sliding.value && panX.value > maxPanX.value) {
  //     panX.value = withTiming(panX.value - WAVE_BAR_TOTAL_WIDTH, {
  //       duration: 0,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (isPlaying && !isRecording && !sliding.value) {
  //     const interval = setInterval(() => updateProgress(), 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [isPlaying, isRecording]);

  // useEffect(() => {
  //   const interval = setInterval(() => updateProgress(), 100);
  //   return () => clearInterval(interval);
  // }, []);

  // const updateProgress = useCallback(() => {
  //   'worklet';

  //   const scrollableWidth = maxPanX.value;
  //   const progress = playbackTime / duration;
  //   const newPanX = scrollableWidth * progress;

  //   console.log('newPanX:', newPanX);
  //   panX.value = withTiming(newPanX, { duration: 0 });
  // }, [duration, playbackTime, progress]);

  // useEffect(() => {
  //   if (isPlaying && !isRecording && !sliding.value) {
  //     updateProgress();
  //   }
  // }, [isPlaying, playbackTime, isRecording, sliding, updateProgress]);

  const resetWaveformPosition = () => {
    panX.value = withTiming(0, { duration: 300 });
  };

  useAnimatedReaction(
    () => waveformWidth.value,
    () => {
      if (isRecording) {
        panX.value = WAVE_CONTAINER_WIDTH - waveformWidth.value;
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
