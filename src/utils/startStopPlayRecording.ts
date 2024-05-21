import { Audio } from 'expo-av';

export const startRecording = async (
  setRecording: (value: Audio.Recording | null) => void,
) => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
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
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  setRecordingUri(uri);
  setDuration(recording._finalDurationMillis / 1000);
};

export const playRecording = async (uri: string) => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  } catch (err) {
    console.error('Failed to play recording', err);
  }
};
