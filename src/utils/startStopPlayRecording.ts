import { Audio } from 'expo-av';

export const startRecording = async (
  setRecording: (value: Audio.Recording | null) => void,
) => {
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    setRecording(recording);
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

export const stopRecording = async (
  recording: Audio.Recording,
  setRecording: (value: Audio.Recording | null) => void,
  setRecordingUri: (uri: string) => void,
) => {
  console.log('Stopping recording..');
  if (!recording) return;

  setRecording(null);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  setRecordingUri(uri);
  console.log('Recording stopped and stored at', uri);
};

export const playRecording = async (uri: string) => {
  try {
    console.log('Playing recording..');
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
    console.log('Recording playing');
  } catch (err) {
    console.error('Failed to play recording', err);
  }
};
