import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import {
  WAVE_BAR_TOTAL_WIDTH,
  AUDIO_UPDATE_INTERVAL,
} from '@src/components/common/constants';
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
  const { didJustFinish, soundRef } = useAudioPlayer();

  const prevWave = useRef(fullWave);
  const intervalRef = useRef(null);

  const progress = useSharedValue(0);
  const isPlayingShared = useSharedValue(isPlaying);
  const durationShared = useSharedValue(duration || 1);
  const hasReachedEnd = useSharedValue(false);

  const waveformWidth = useDerivedValue(() => {
    return fullWave.length * WAVE_BAR_TOTAL_WIDTH;
  });

  const panX = useDerivedValue(() => {
    return progress.value * -waveformWidth.value;
  });

  const getPositionMillis = async () => {
    try {
      const status = await soundRef.current.getStatusAsync();
      return status.isLoaded ? status.positionMillis : 0;
    } catch (error) {
      console.error('Error getting audio position:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (fullWave.length === 0 && prevWave.current.length > 0) {
      progress.value = 0;
    }
    prevWave.current = fullWave;
  }, [fullWave]);

  useEffect(() => {
    durationShared.value = duration || 1;
    isPlayingShared.value = isPlaying;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying) {
      if (hasReachedEnd.value) {
        progress.value = 0;
        hasReachedEnd.value = false;
      }

      intervalRef.current = setInterval(async () => {
        try {
          const positionMillis = await getPositionMillis();
          if (positionMillis !== null && positionMillis !== undefined) {
            const newProgress = Math.min(1, positionMillis / (duration * 1000));
            progress.value = newProgress;
          }
        } catch (error) {
          console.error('Error getting audio position:', error);
        }
      }, AUDIO_UPDATE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, getPositionMillis]);

  useEffect(() => {
    if (didJustFinish) {
      progress.value = 1;
      hasReachedEnd.value = true;
    }
  }, [didJustFinish]);

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
