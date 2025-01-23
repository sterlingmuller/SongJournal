import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import useDebounce from '@src/utils/hooks/useDebounce';

const useNetworkStatus = (processUploadQueue: () => Promise<void>) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const handleNetworkChange = useDebounce((state: NetInfoState) => {
    console.log('Network state changed:', state);
    setIsOnline(state.isConnected);
  }, 500);

  useEffect(() => {
    console.log('Subscribing to network changes...');
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      console.log('Unsubscribing from network changes...');
      unsubscribe();
    };
  }, [handleNetworkChange]);

  useEffect(() => {
    if (isOnline) {
      processUploadQueue();
    }
  }, [isOnline, processUploadQueue]);

  return { isOnline };
};

export default useNetworkStatus;
