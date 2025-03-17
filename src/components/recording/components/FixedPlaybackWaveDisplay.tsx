import React, { useEffect, useMemo, useRef } from 'react';
import { View, Pressable, GestureResponderEvent } from 'react-native';
import { useSharedValue, runOnUI } from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useRecording } from '@src/state/context/RecordingContext';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import {
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';
import usePlaybackTimer from '@src/hooks/usePlaybackTimer';

const FixedPlaybackWaveDisplay = () => {
  const styles = useAudioWaveStyles();
  const isPlaying = useAppSelector(selectIsPlaying);
  const { fullWaveRef, duration } = useRecording();
  const { soundRef, didJustFinish, seekTo } = useAudioPlayer();

  const progress = useSharedValue(0);
  const completedRef = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSeekingRef = useRef(false);

  const fullWave = useMemo(
    () => [...(fullWaveRef.current || [])],
    [fullWaveRef.current],
  );

  const { resampledWave, actualWaveWidth } = useMemo(() => {
    if (!fullWave || fullWave.length === 0)
      return { resampledWave: [], actualWaveWidth: 0 };

    const totalBars = Math.floor(WAVE_CONTAINER_WIDTH / WAVE_BAR_TOTAL_WIDTH);
    const output = [];
    const ratio = fullWave.length / totalBars;

    for (let i = 0; i < totalBars; i++) {
      const sampleIndex = Math.floor(i * ratio);
      const nextSampleIndex = Math.min(
        fullWave.length - 1,
        Math.floor((i + 1) * ratio),
      );

      let sum = 0;
      let count = 0;

      for (let j = sampleIndex; j <= nextSampleIndex; j++) {
        sum += fullWave[j];
        count++;
      }

      output.push(Math.floor(sum / count));
    }

    return {
      resampledWave: output,
      actualWaveWidth: output.length * WAVE_BAR_TOTAL_WIDTH,
    };
  }, [fullWave]);

  usePlaybackTimer(soundRef, isPlaying, (currentTime: number) => {
    if (!isSeekingRef.current && duration > 0 && !completedRef.current) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        runOnUI(() => {
          progress.value = currentTime / duration;
        })();
      }, 50);
    }
  });

  useEffect(() => {
    if (didJustFinish) {
      runOnUI(() => {
        progress.value = 1;
      })();
      completedRef.current = true;
    }
  }, [didJustFinish, progress]);

  useEffect(() => {
    if (isPlaying && completedRef.current) {
      runOnUI(() => {
        progress.value = 0;
      })();
      completedRef.current = false;
    }
  }, [isPlaying, progress]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleSeek = async (event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;

    if (locationX >= 0 && locationX <= actualWaveWidth) {
      const seekPosition = (locationX / actualWaveWidth) * duration;

      if (seekPosition >= 0 && seekPosition <= duration) {
        isSeekingRef.current = true;

        runOnUI(() => {
          progress.value = seekPosition / duration;
        })();

        await seekTo(seekPosition);

        if (soundRef.current) {
          const status = await soundRef.current.getStatusAsync();
          if (status.isLoaded) {
            runOnUI(() => {
              progress.value = status.positionMillis / 1000 / duration;
            })();
          }
        }

        isSeekingRef.current = false;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <Pressable
          onPress={handleSeek}
          style={[
            styles.pressableContainer,
            {
              width: actualWaveWidth,
            },
          ]}
        />
        <View style={[styles.waveformContainer, { width: actualWaveWidth }]}>
          <WaveForms
            waveForm={resampledWave}
            progress={progress}
            actualWaveWidth={actualWaveWidth}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(FixedPlaybackWaveDisplay);
