import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import useRecordingStyles from '@src/styles/recording';
import { WAVE_BAR_TOTAL_WIDTH } from '@src/components/common/constants';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useRecording } from '@src/state/context/RecordingContext';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import formatDuration from '@src/utils/formatDuration';
import StyledText from '@src/components/common/components/StyledText';

const PlaybackWaveFormDisplay = () => {
  const waveStyles = useAudioWaveStyles();
  const isPlaying = useAppSelector(selectIsPlaying);
  // const isPlaying = true;
  const { fullWaveRef, duration } = useRecording();
  // const { isPlaying } = useAudioPlayer();
  const fullWave = fullWaveRef.current;

  console.log('wee');

  const prevWave = useRef(fullWave);

  // Memoize the WaveForms component
  const memoizedWaveForms = useMemo(() => {
    return <WaveForms waveForms={fullWave} />;
  }, [fullWave]);

  // Animation shared values
  const progress = useSharedValue(0);
  const isPlayingShared = useSharedValue(isPlaying);
  const durationShared = useSharedValue(duration || 1);
  const hasReachedEnd = useSharedValue(false);

  // Calculate waveform width
  const waveformWidth = useDerivedValue(() => {
    return fullWave.length * WAVE_BAR_TOTAL_WIDTH;
  });

  // Calculate horizontal position
  const panX = useDerivedValue(() => {
    return progress.value * -waveformWidth.value;
  });

  // Update shared values when props change
  useEffect(() => {
    durationShared.value = duration || 1;
    isPlayingShared.value = isPlaying;

    // Reset animation if playback restarts after ending
    if (isPlaying && hasReachedEnd.value) {
      progress.value = 0;
      hasReachedEnd.value = false;
    }
  }, [duration, isPlaying]);

  // Reset wave position when wave data is cleared
  useEffect(() => {
    if (fullWave.length === 0 && prevWave.current.length > 0) {
      progress.value = 0;
    }
    prevWave.current = fullWave;
  }, [fullWave]);

  // Handle playback animation - optimized for better performance
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimation(progress);
      return;
    }

    // Use withTiming for the animation
    progress.value = withTiming(
      1,
      {
        duration: (1 - progress.value) * durationShared.value * 1000,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          hasReachedEnd.value = true;
        }
      },
    );
  }, [isPlaying, duration]);

  // Animated styles
  const maskAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: panX.value }] };
  });

  const playedAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: -panX.value,
    };
  });

  // Masked element for waveform display
  const maskedElement = (
    <Animated.View
      style={[waveStyles.maskElementContainerNotRecording, maskAnimatedStyle]}
    >
      {fullWave.length > 0 && memoizedWaveForms}
    </Animated.View>
  );

  return (
    <View style={waveStyles.container}>
      <View style={waveStyles.waveContainer}>
        <MaskedView style={waveStyles.maskedView} maskElement={maskedElement}>
          <Animated.View
            style={[waveStyles.playedSection, playedAnimatedStyle]}
          />
          <View style={waveStyles.unplayedSection} />
        </MaskedView>
      </View>
      {fullWave.length > 0 && <View style={waveStyles.midpointLine} />}
    </View>
  );
};

export default PlaybackWaveFormDisplay;
