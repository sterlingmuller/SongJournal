import {
  AUDIO_UPDATE_INTERVAL,
  SILENCE_THRESHOLD,
} from '@src/components/common/constants';
import { Audio } from 'expo-av';
import { RecordingStatus } from 'expo-av/build/Audio';

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
  fullWaveRef: number[],
  setVisibleWave: (value: number[] | ((value: number[]) => number[])) => void,
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
        // console.log('averageLevel:', averageLevel);
        fullWaveRef.push(averageLevel);
        setVisibleWave((prevWave: number[]) => [
          ...prevWave.slice(1),
          averageLevel,
        ]);
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
  setRecording: (value: Audio.Recording | null) => void,
  setDuration: (duration: number) => void,
) => {
  if (!recording) return;

  setRecording(null);
  clearInterval(audioWaveIntervalId);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();

  const duration = Math.floor(recording._finalDurationMillis / 1000);
  setDuration(duration);

  return uri;
};

export const clearRecording = async (
  recording: Audio.Recording | null,
  setRecording: (value: Audio.Recording | null) => void,
  setRecordingUri: (uri: string | null) => void,
  setDuration: (duration: number) => void,
) => {
  if (recording) {
    await recording.stopAndUnloadAsync();
  }
  clearInterval(audioWaveIntervalId);
  setRecording(null);
  setRecordingUri(null);
  setDuration(null);
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
