import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import {
  PLAYBACK_START_DELAY,
  WAVE_BAR_TOTAL_WIDTH,
} from '@src/components/common/constants';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';

interface Props {
  fullWave: number[];
  duration: number;
  isPlaying: boolean;
}

const PlaybackWaveDisplay = React.memo((props: Props) => {
  const { fullWave, duration, isPlaying } = props;
  const styles = useAudioWaveStyles();
  const prevWave = useRef(fullWave);

  const memoizedWaveForms = useMemo(() => {
    return <WaveForms waveForms={fullWave} />;
  }, []);

  const progress = useSharedValue(0);
  const manualPanX = useSharedValue(0);
  const isPlayingShared = useSharedValue(false);
  const durationShared = useSharedValue(duration || 1);
  const hasReachedEnd = useSharedValue(false);

  const waveformWidth = useDerivedValue(
    () => fullWave.length * WAVE_BAR_TOTAL_WIDTH,
  );

  const panX = useDerivedValue(() => {
    return progress.value * -waveformWidth.value;
  });

  const resetWaveformPosition = useCallback(() => {
    progress.value = 0;
    manualPanX.value = 0;
  }, [progress, manualPanX]);

  useEffect(() => {
    durationShared.value = duration || 1;
    isPlayingShared.value = isPlaying;

    if (isPlaying && hasReachedEnd.value) {
      progress.value = 0;
      hasReachedEnd.value = false;
    }
  }, [duration, isPlaying]);

  useAnimatedReaction(
    () => isPlayingShared.value,
    (isAnimatedPlaying: boolean) => {
      if (isAnimatedPlaying) {
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
    [isPlayingShared, durationShared],
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
      width: -panX.value,
    };
  });

  const maskedElement = (
    <Animated.View
      style={[styles.maskElementContainerNotRecording, maskAnimatedStyle]}
    >
      {fullWave.length > 0 && memoizedWaveForms}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <MaskedView style={styles.maskedView} maskElement={maskedElement}>
          <Animated.View style={[styles.playedSection, playedAnimatedStyle]} />
          <View style={styles.unplayedSection} />
        </MaskedView>
      </View>
      {fullWave.length > 0 && <View style={styles.midpointLine} />}
    </View>
  );
});

export default PlaybackWaveDisplay;
