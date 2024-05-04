import { Audio } from 'expo-av';

export const requestMicrophonePermissions = async () => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    return status;
  } catch (err) {
    console.warn(err);
    return null;
  }
};
