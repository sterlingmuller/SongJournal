import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { appState } from '@src/common/types';
import { requestMicrophonePermissions } from '@src/utils/permissions';

const useMicrophonePermissions = () => {
  const [isPermissionGranted, setIsPermissionGranted] =
    useState<boolean>(false);

  useEffect(() => {
    const getMicrophonePermission = async () => {
      const status = await requestMicrophonePermissions();
      setIsPermissionGranted(status === 'granted');
    };

    const handleAppStateChange = async (nextAppState: appState) => {
      if (nextAppState === 'active') {
        getMicrophonePermission();
      }
    };

    handleAppStateChange('active');

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return isPermissionGranted;
};

export default useMicrophonePermissions;
