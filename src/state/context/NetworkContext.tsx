import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import useDebounce from '@src/utils/hooks/useDebounce';
import useUploadQueue from '@dropbox/hooks/useUploadQueue';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectCloudConnection,
  selectIsAutoSyncEnabled,
} from '../selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';

interface NetworkContextProps {
  isOnline: boolean;
  setIsOnline: any;
}

const NetworkContext = createContext<NetworkContextProps>(null);

type Props = {
  children?: ReactNode;
};

export const NetworkProvider = ({ children }: Props) => {
  // For testing
  // const [isOnline, setIsOnline] = useState<boolean>(false);

  const [isOnline, setIsOnline] = useState<boolean>(false);
  const { processUploadQueue } = useUploadQueue();
  const cloudConnection = useAppSelector(selectCloudConnection);
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);

  // comment out lines 35-48 to test without going offline
  // const handleNetworkChange = useDebounce((networkState: NetInfoState) => {
  //   console.log('Network state changed:', networkState);
  //   setIsOnline(networkState.isConnected);
  // }, 500);

  // useEffect(() => {
  //   console.log('Subscribing to network changes...');
  //   const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

  //   return () => {
  //     console.log('Unsubscribing from network changes...');
  //     unsubscribe();
  //   };
  // }, [handleNetworkChange]);

  useEffect(() => {
    // and if auto sync is enabled!
    if (
      isOnline &&
      cloudConnection !== CloudConnection.NONE &&
      isAutoSyncEnabled
    ) {
      console.log('calling processUploadQueue');
      processUploadQueue();
    } else {
      console.log('not connected to cloud or offline');
    }
  }, [processUploadQueue, isOnline, cloudConnection]);

  return (
    <NetworkContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkStatus: () => NetworkContextProps = () =>
  useContext(NetworkContext);
