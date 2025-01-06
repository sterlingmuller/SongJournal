import {
  AUDIO_UPDATE_INTERVAL,
  SILENCE_THRESHOLD,
} from '@src/components/common/constants';
import { Audio } from 'expo-av';
import { RecordingStatus } from 'expo-av/build/Audio';
import { MutableRefObject } from 'react';

let levelSum = 0;
let levelCount = 0;
let audioWaveIntervalId: NodeJS.Timeout;

const updateAudioLevelSum = async (recording: Audio.Recording) => {
  const { metering } = await recording.getStatusAsync();
  const normalizedLevel = (metering + 160) / 160;

  if (normalizedLevel > SILENCE_THRESHOLD) {
    const scaledLevel = normalizedLevel * 100;

    if (scaledLevel) {
      levelSum += scaledLevel;
      levelCount++;
    }
  }
};

export const startRecording = async (
  setRecording: (value: Audio.Recording | null) => void,
  fullWaveRef: MutableRefObject<number[]>,
  setRecordingWave: (value: number[] | ((value: number[]) => number[])) => void,
  maxBars: number,
) => {
  try {
    await Audio.requestPermissionsAsync();

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );

    newRecording.setOnRecordingStatusUpdate((status: RecordingStatus) => {
      if (status.isRecording) {
        updateAudioLevelSum(newRecording);
      }
    });

    audioWaveIntervalId = setInterval(() => {
      const averageLevel = Math.round(levelSum / levelCount);
      if (averageLevel > 0) {
        fullWaveRef.current.push(averageLevel);
        setRecordingWave((prevWave: number[]) => {
          const newWave = [...prevWave, averageLevel];
          if (newWave.length > maxBars) {
            return newWave.slice(-maxBars);
          }
          return newWave;
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

export const stopRecording = async (recording: Audio.Recording) => {
  if (!recording) return;
  clearInterval(audioWaveIntervalId);
  const uri = recording.getURI();
  await recording.stopAndUnloadAsync();

  return uri;
};

export const clearRecording = async (
  recording: Audio.Recording | null,
  setRecording: (value: Audio.Recording | null) => void,
  setRecordingUri: (uri: string | null) => void,
  setRecordingWave: (value: number[] | ((value: number[]) => number[])) => void,
) => {
  if (recording) {
    clearInterval(audioWaveIntervalId);
    await recording.stopAndUnloadAsync();
    setRecording(null);
  }

  setRecordingWave([]);
  setRecordingUri(null);
};

export const playRecording = async (uri: string) => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri });

    await sound.playAsync();
  } catch (err) {
    console.error('Failed to play recording', err);
  }
};

export const pauseRecording = async (uri: string) => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.pauseAsync();
  } catch (err) {
    console.error('Failed to play recording', err);
  }
};
