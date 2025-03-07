import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  withTiming,
  cancelAnimation,
  runOnUI,
  Easing,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveForms from '@src/components/recording/subcomponents/WaveForm';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useRecording } from '@src/state/context/RecordingContext';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import {
  WAVE_BAR_TOTAL_WIDTH,
  WAVE_CONTAINER_WIDTH,
} from '@src/components/common/constants';

// Increase the calibration factor to keep up with audio
const SYNC_CALIBRATION = 1.05;

const FixedPlaybackWaveDisplay = () => {
  const styles = useAudioWaveStyles();
  const isPlaying = useAppSelector(selectIsPlaying);
  const { fullWaveRef, duration } = useRecording();
  const { currentTime, didJustFinish, seekTo } = useAudioPlayer();
  const [wasFinished, setWasFinished] = useState(false);
  const animationRef = useRef(null);
  const intervalRef = useRef(null);
  const driftFactorRef = useRef(SYNC_CALIBRATION);

  const fullWave = fullWaveRef.current;
  const progress = useSharedValue(0);

  // Improved wave resampling for more accurate representation
  const resampledWave = useMemo(() => {
    if (!fullWave || fullWave.length === 0) return [];

    const totalBars = Math.floor(WAVE_CONTAINER_WIDTH / WAVE_BAR_TOTAL_WIDTH);

    // Simple case: fewer points than bars
    if (fullWave.length <= totalBars) {
      return [...fullWave];
    }

    // Use more precise resampling for larger waveforms
    // This approach ensures time-proportional sampling
    const output = [];
    const ratio = fullWave.length / totalBars;

    for (let i = 0; i < totalBars; i++) {
      const sampleIndex = Math.floor(i * ratio);
      const nextSampleIndex = Math.min(
        fullWave.length - 1,
        Math.floor((i + 1) * ratio),
      );

      // Take average of all samples in this segment
      let sum = 0;
      let count = 0;

      for (let j = sampleIndex; j <= nextSampleIndex; j++) {
        sum += fullWave[j];
        count++;
      }

      output.push(Math.floor(sum / count));
    }

    return output;
  }, [fullWave]);

  const actualWaveWidth = useMemo(() => {
    return resampledWave.length * WAVE_BAR_TOTAL_WIDTH;
  }, [resampledWave]);

  // Adaptive sync mechanism that monitors and corrects drift
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Check for drift every 250ms
    intervalRef.current = setInterval(() => {
      if (currentTime !== null && duration > 0) {
        const expectedProgress = currentTime / duration;
        const actualProgress = progress.value;
        const progressDiff = expectedProgress - actualProgress;

        // Analyze drift for patterns
        if (progressDiff > 0.03) {
          // Audio is ahead of animation - speed up animation
          driftFactorRef.current = Math.min(
            driftFactorRef.current + 0.01,
            1.15,
          );

          // If significant drift, do an immediate correction
          if (progressDiff > 0.08) {
            const remainingDuration = (1 - expectedProgress) * duration * 1000;
            runOnUI(() => {
              cancelAnimation(progress);
              progress.value = expectedProgress;
              progress.value = withTiming(1, {
                duration: remainingDuration / driftFactorRef.current,
                easing: Easing.linear,
              });
            })();
          }
        } else if (progressDiff < -0.03) {
          // Animation is ahead of audio - slow down animation slightly
          driftFactorRef.current = Math.max(driftFactorRef.current - 0.01, 1.0);
        }
      }
    }, 250);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentTime, duration, progress]);

  // Handle direct updates to progress when not playing
  useEffect(() => {
    if (!isPlaying && currentTime !== null && duration > 0) {
      runOnUI(() => {
        cancelAnimation(progress);
        progress.value = currentTime / duration;
      })();
    }
  }, [currentTime, isPlaying, duration, progress]);

  // Handle playback state changes
  useEffect(() => {
    if (isPlaying) {
      // Reset drift factor when starting playback
      driftFactorRef.current = SYNC_CALIBRATION;

      // Reset progress if we're starting playback after finishing
      if (wasFinished) {
        runOnUI(() => {
          progress.value = 0;
        })();
        setWasFinished(false);
      }

      if (duration > 0 && currentTime !== null) {
        const startPos = Math.max(0, currentTime / duration);
        const remainingDuration = (1 - startPos) * duration * 1000;

        // Use a slightly larger delay to ensure audio is properly initialized
        setTimeout(() => {
          runOnUI(() => {
            cancelAnimation(progress);
            progress.value = startPos;
            progress.value = withTiming(1, {
              duration: remainingDuration / driftFactorRef.current,
              easing: Easing.linear,
            });
          })();
          animationRef.current = 'running';
        }, 100);
      }
    } else {
      animationRef.current = null;
    }
  }, [isPlaying, wasFinished, duration, currentTime, progress]);

  // Handle playback completion
  useEffect(() => {
    if (didJustFinish) {
      runOnUI(() => {
        cancelAnimation(progress);
        progress.value = 0;
      })();
      setWasFinished(true);
      animationRef.current = null;
    }
  }, [didJustFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <View
          style={[
            styles.waveformContainer,
            {
              justifyContent: 'center',
              paddingHorizontal: resampledWave.length < 10 ? 20 : 0,
            },
          ]}
        >
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
