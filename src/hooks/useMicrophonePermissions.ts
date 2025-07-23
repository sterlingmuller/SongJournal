import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { Audio } from 'expo-av';

const useMicrophonePermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    'undetermined' | 'granted' | 'denied'
  >('undetermined');

  const checkAndRequestPermission = useCallback(async () => {
    try {
      const { status } = await Audio.getPermissionsAsync();

      if (status === 'granted') {
        setPermissionStatus('granted');
      } else if (status === 'denied') {
        setPermissionStatus('denied');
      } else {
        const { status: newStatus } = await Audio.requestPermissionsAsync();
        setPermissionStatus(newStatus === 'granted' ? 'granted' : 'denied');
      }
    } catch (error) {
      console.error(
        'Error checking or requesting microphone permission:',
        error
      );
      setPermissionStatus('denied');
    }
  }, []);

  useEffect(() => {
    checkAndRequestPermission();

    const subscription = AppState.addEventListener(
      'change',
      checkAndRequestPermission
    );

    return () => subscription.remove();
  }, [checkAndRequestPermission, permissionStatus]);

  return permissionStatus;
};

export default useMicrophonePermissions;
