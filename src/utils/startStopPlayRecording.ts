import { AUDIO_UPDATE_INTERVAL } from '@src/components/common/constants';
import { Audio } from 'expo-av';
import { RecordingStatus } from 'expo-av/build/Audio';

// export const startRecording = async (
//   setRecording: (value: Audio.Recording | null) => void,
// ) => {
//   try {
//     await Audio.requestPermissionsAsync();
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: true,
//       playsInSilentModeIOS: true,
//     });

//     const { recording } = await Audio.Recording.createAsync(
//       Audio.RecordingOptionsPresets.HIGH_QUALITY,
//     );
//     setRecording(recording);
//   } catch (err) {
//     console.error('Failed to start recording', err);
//   }
// };

let levelSum = 0;
let levelCount = 0;
let audioWaveIntervalId: NodeJS.Timeout;

const updateAudioLevelSum = async (recording: Audio.Recording) => {
  const { metering } = await recording.getStatusAsync();
  const normalizedLevel = Math.min(Math.max((metering + 160) / 160, 0), 1);

  const scaledLevel = normalizedLevel * 50;

  if (scaledLevel) {
    levelSum += scaledLevel;
    levelCount++;
  }
};

export const startRecording = async (
  setRecording: (value: Audio.Recording | null) => void,
  fullWaveRef: number[],
  setVisibleWave: (value: number[] | ((value: number[]) => number[])) => void,
) => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
      (status: RecordingStatus) => {
        if (status.isRecording) {
          updateAudioLevelSum(recording);
        }
      },
      100,
    );

    audioWaveIntervalId = setInterval(() => {
      const averageLevel = Math.round(levelSum / levelCount);
      if (averageLevel > 0) {
        fullWaveRef.push(averageLevel);
        setVisibleWave((prevWave: number[]) => [
          ...prevWave.slice(1),
          averageLevel,
        ]);
      }
      // else {
      //   handleAudioData(0);
      // }

      levelSum = 0;
      levelCount = 0;
    }, AUDIO_UPDATE_INTERVAL);

    setRecording(recording);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

export const stopRecording = async (
  recording: Audio.Recording,
  setRecording: (value: Audio.Recording | null) => void,
  setRecordingUri: (uri: string) => void,
  setDuration: (duration: number) => void,
) => {
  if (!recording) return;

  setRecording(null);
  clearInterval(audioWaveIntervalId);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  setRecordingUri(uri);

  const duration = Math.floor(recording._finalDurationMillis / 1000);

  setDuration(duration);
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

    // Todo: Progress playback tracker bar
    // sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatusSuccess) => {
    // });

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
