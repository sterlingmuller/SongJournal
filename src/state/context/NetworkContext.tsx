import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import useDebounce from '@src/hooks/useDebounce';
import useUploadQueue from '@dropbox/hooks/useUploadQueue';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  selectCloudConnection,
  selectIsAutoSyncEnabled,
} from '../selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';

interface NetworkContextProps {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
}

const NetworkContext = createContext<NetworkContextProps>(null);

type Props = {
  children?: ReactNode;
};

export const NetworkProvider = ({ children }: Props) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const { processUploadQueue } = useUploadQueue();
  const cloudConnection = useAppSelector(selectCloudConnection);
  const isAutoSyncEnabled = useAppSelector(selectIsAutoSyncEnabled);

  // comment out lines 35-48 to test without going offline
  const handleNetworkChange = useDebounce((networkState: NetInfoState) => {
    setIsOnline(networkState.isConnected);
  }, 500);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, [handleNetworkChange]);

  useEffect(() => {
    if (
      isOnline &&
      cloudConnection !== CloudConnection.NONE &&
      isAutoSyncEnabled
    ) {
      processUploadQueue();
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
