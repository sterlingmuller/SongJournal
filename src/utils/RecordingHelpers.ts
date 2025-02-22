import { Audio } from 'expo-av';
import { RecordingStatus } from 'expo-av/build/Audio';
import { MutableRefObject } from 'react';

import {
  AUDIO_UPDATE_INTERVAL,
  MAX_BARS,
  SILENCE_THRESHOLD,
} from '@src/components/common/constants';

let audioWaveIntervalId: NodeJS.Timeout;

export const startRecording = async (
  setRecording: (value: Audio.Recording | null) => void,
  fullWaveRef: MutableRefObject<number[]>,
  setRecordingWave: (value: number[] | ((value: number[]) => number[])) => void,
) => {
  try {
    await Audio.requestPermissionsAsync();

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );

    let levelSum = 0;
    let levelCount = 0;

    newRecording.setProgressUpdateInterval(50);
    newRecording.setOnRecordingStatusUpdate(
      async ({ metering }: RecordingStatus) => {
        if (metering > SILENCE_THRESHOLD) {
          const normalizedLevel = (metering + 160) / 160;
          const scaledLevel = normalizedLevel * 100;

          levelSum += scaledLevel;
          levelCount++;
        }
      },
    );

    audioWaveIntervalId = setInterval(() => {
      if (levelCount > 0) {
        const averageLevel = Math.round(levelSum / levelCount);

        fullWaveRef.current.push(averageLevel);
        setRecordingWave((prevWave: number[]) => {
          const newWave = [...prevWave, averageLevel];
          return newWave.slice(-MAX_BARS);
        });
      }

      levelSum = 0;
      levelCount = 0;
    }, AUDIO_UPDATE_INTERVAL);

    setRecording(newRecording);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

export const stopRecording = async (
  recording: Audio.Recording,
  setIsRecording: (value: boolean) => void,
) => {
  clearInterval(audioWaveIntervalId);
  await recording.stopAndUnloadAsync();
  setIsRecording(false);
};
