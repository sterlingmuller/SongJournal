import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import useAudioWaveStyles from '@src/styles/audioWave';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PAN_SENSITIVITY,
  SCREEN_WIDTH,
  WAVE_BAR_GAP,
  WAVE_BAR_WIDTH,
} from '@src/components/common/constants';
import WaveForms from '../subcomponents/WaveForm';

interface Props {
  isRecording: boolean;
  wave: number[];
}

const AudioWaveDisplay = (props: Props) => {
  const { isRecording, wave } = props;
  const styles = useAudioWaveStyles();

  const MOCK_FULL_WAVE = [
    30, 30, 30, 30, 30, 75, 75, 74, 74, 73, 76, 65, 67, 66, 77, 76, 73, 78, 83,
    76, 84, 86, 74, 56, 65, 67, 75, 73, 87, 76, 78, 65, 65, 67, 67, 76, 75, 73,
    74, 74, 73, 72, 75, 75, 83, 82, 81, 80, 78, 75, 79, 77, 76, 77, 77, 75, 73,
    87, 76, 78, 65, 65, 67, 67, 76, 75, 73, 74, 74, 73, 72, 75, 75, 83, 82, 81,
    80, 78, 75, 79, 77, 76, 77, 77, 30, 30, 30, 30, 30,
  ];

  const playing = useSharedValue(false);
  const sliding = useSharedValue(false);
  const panX = useSharedValue(0);

  const waveformWidth = MOCK_FULL_WAVE.length * (WAVE_BAR_WIDTH + WAVE_BAR_GAP);
  const maxPanX = -waveformWidth;

  const findNearestMultiple = (n: number, multiple: number) => {
    'worklet';
    return Math.floor(n / multiple) * multiple;
  };

  // const updateProgress = () => {
  //   'worklet';

  //   if (playing.value && !sliding.value && panX.value > maxPanX) {
  //     panX.value = withTiming(panX.value - 6);
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => runOnJS(updateProgress)(), 150);
  //   return () => clearInterval(interval);
  // }, []);

  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      sliding.value = true;
    })
    .onChange(
      (
        event: GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >,
      ) => {
        const translation = event.translationX * PAN_SENSITIVITY;
        const nextPanX = panX.value + translation;

        if (nextPanX > 0) {
          panX.value = 0;
        } else if (nextPanX < maxPanX) {
          panX.value = maxPanX;
        } else {
          panX.value = nextPanX;
        }
      },
    )
    .onFinalize(() => {
      panX.value = withTiming(findNearestMultiple(panX.value, WAVE_BAR_WIDTH));

      sliding.value = false;
    });

  const maskAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: panX.value }] };
  });

  const playedAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: -panX.value,
    };
  });

  console.log('wave:', wave);

  const maskedElement = (
    <Animated.View style={[styles.maskElementContainer, maskAnimatedStyle]}>
      {wave.length && <WaveForms waveForms={MOCK_FULL_WAVE} />}
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
