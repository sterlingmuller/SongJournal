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
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import {
  PAN_SENSITIVITY,
  WAVE_BAR_GAP,
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
  // const scrollStarted = useRef(false);
  const prevIsRecording = useRef(isRecording);
  const prevWave = useRef(wave);
  const { isPlaying, playbackTime, duration } =
    useAppSelector(selectPlaybackInfo);
  const { seekTo } = useAudioPlayer();

  const waveformWidth = useDerivedValue(
    () => wave.length * (WAVE_BAR_WIDTH + WAVE_BAR_GAP),
  );
  const maxPanX = useDerivedValue(() => -waveformWidth.value);

  const findNearestMultiple = (n: number, multiple: number) => {
    'worklet';
    return Math.floor(n / multiple) * multiple;
  };

  // const updateProgress = () => {
  //   'worklet';

  //   // if (isPlaying && !sliding.value && panX.value > maxPanX.value) {
  //   //   // moves 1 bar, every 30 ms
  //   //   panX.value = withTiming(panX.value - WAVE_BAR_WIDTH, { duration: 30 });
  //   // }

  //   console.log('playbackTime:', playbackTime);
  //   console.log('/duration:', duration);

  //   if (isPlaying && !sliding.value && duration > 0) {
  //     const scrollableWidth = waveformWidth.value - WAVE_CONTAINER_WIDTH;
  //     const progress = playbackTime / duration;
  //     const newPanX = -scrollableWidth * progress;
  //     panX.value = withTiming(Math.max(maxPanX.value, Math.min(0, newPanX)), {
  //       duration: 100,
  //     });
  //   }
  // };

  const updateProgress = useCallback(() => {
    'worklet';
    console.log('playbackTime:', playbackTime);
    //   console.log('/duration:', duration);
    if (!isRecording && !sliding.value && duration > 0) {
      const scrollableWidth = WAVE_CONTAINER_WIDTH;
      const progress = playbackTime / duration;
      const newPanX = -scrollableWidth * progress;
      panX.value = withTiming(Math.max(maxPanX.value, Math.min(0, newPanX)), {
        duration: 100,
      });
    }
  }, [
    isRecording,
    sliding.value,
    duration,
    playbackTime,
    waveformWidth.value,
    maxPanX.value,
  ]);

  useEffect(() => {
    if (!isRecording) {
      updateProgress();
    }
  }, [isRecording, playbackTime, updateProgress]);

  const resetWaveformPosition = () => {
    panX.value = withTiming(0, { duration: 300 });
    // scrollStarted.current = false;
  };

  // useEffect(() => {
  //   let animationFrame: number;
  //   const animate = () => {
  //     runOnJS(updateProgress)();
  //     animationFrame = requestAnimationFrame(animate);
  //   };

  //   if (isPlaying) {
  //     animationFrame = requestAnimationFrame(animate);
  //   }

  //   return () => {
  //     if (animationFrame) cancelAnimationFrame(animationFrame);
  //   };
  // }, [isPlaying]);

  useEffect(() => {
    if (isRecording) {
      const newPanX = Math.max(
        maxPanX.value,
        WAVE_CONTAINER_WIDTH - waveformWidth.value,
      );
      panX.value = withTiming(newPanX, { duration: 100 });
    }

    wasRecording.current = isRecording;
  }, [wave, isRecording]);

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
          panX.value = Math.max(
            maxPanX.value,
            Math.min(0, panX.value + translation),
          );
        }
      },
    )
    .onFinalize(() => {
      // panX.value = withTiming(findNearestMultiple(panX.value, WAVE_BAR_WIDTH));
      // sliding.value = false;
      if (!isRecording) {
        panX.value = withTiming(
          findNearestMultiple(panX.value, WAVE_BAR_WIDTH),
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
