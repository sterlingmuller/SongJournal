import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import { WAVE_BAR_TOTAL_WIDTH } from '@src/components/common/constants';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useRecording } from '@src/state/context/RecordingContext';
import { useAudioPlayer } from '@src/state/context/AudioContext';

const PlaybackWaveDisplay = () => {
  const styles = useAudioWaveStyles();
  const isPlaying = useAppSelector(selectIsPlaying);
  const { fullWaveRef, duration } = useRecording();
  const fullWave = fullWaveRef.current;
  const { didJustFinish } = useAudioPlayer();

  const prevWave = useRef(fullWave);

  const progress = useSharedValue(0);
  const isPlayingShared = useSharedValue(isPlaying);
  const durationShared = useSharedValue(duration || 1);
  const hasReachedEnd = useSharedValue(false);
  const lastTimestamp = useSharedValue(0);
  const animationActive = useSharedValue(false);

  const waveformWidth = useDerivedValue(() => {
    return fullWave.length * WAVE_BAR_TOTAL_WIDTH;
  });
  const panX = useDerivedValue(() => {
    return progress.value * -waveformWidth.value;
  });

  useEffect(() => {
    if (fullWave.length === 0 && prevWave.current.length > 0) {
      progress.value = 0;
    }
    prevWave.current = fullWave;
  }, [fullWave]);

  const prevPlayingRef = useRef(isPlaying);

  useEffect(() => {
    durationShared.value = duration || 1;
    isPlayingShared.value = isPlaying;

    if (isPlaying) {
      if (hasReachedEnd.value) {
        progress.value = 0;
        hasReachedEnd.value = false;
      } else if (progress.value === 1) {
        progress.value = 0;
      }
    }

    prevPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (didJustFinish) {
      progress.value = 1;
      hasReachedEnd.value = true;
    }
  }, [didJustFinish]);

  useAnimatedReaction(
    () => isPlayingShared.value,
    (isAnimatedPlaying: boolean) => {
      if (isAnimatedPlaying && !animationActive.value) {
        animationActive.value = true;
        lastTimestamp.value = Date.now();

        const animate = () => {
          if (!isPlayingShared.value) {
            animationActive.value = false;
            return;
          }

          const now = Date.now();
          const deltaTime = (now - lastTimestamp.value) / 1000;
          lastTimestamp.value = now;

          if (deltaTime > 0 && deltaTime < 0.1) {
            progress.value = Math.min(
              1,
              progress.value + deltaTime / durationShared.value,
            );
          }

          if (progress.value >= 1) {
            progress.value = 1;
            hasReachedEnd.value = true;
            animationActive.value = false;
            return;
          }

          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    },
    [isPlayingShared, durationShared],
  );

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
      {fullWave.length > 0 && <WaveForms waveForm={fullWave} />}
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
};

export default React.memo(PlaybackWaveDisplay);
