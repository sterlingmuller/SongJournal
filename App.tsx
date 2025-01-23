import React, { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'react-native';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/state/context/ThemeContext';
import { store } from '@src/state/store/index';
import { migrateDbIfNeeded } from '@src/data/database/db';
import { AudioProvider } from '@src/state/context/AudioContext';
import { DB_NAME } from '@src/components/common/constants';
import useUploadQueue from '@src/utils/hooks/useUploadQueue';
import useNetworkStatus from '@src/utils/hooks/useNetworkStatus';

const App = () => {
  const { processUploadQueue } = useUploadQueue();
  useNetworkStatus(processUploadQueue);

  // if online and there are files in the queue, process them
  // I don't think we need to pass isOnline around, we can just check status wherever needed

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ColorThemeProvider>
        <Suspense fallback={null}>
          <SQLiteProvider
            databaseName={DB_NAME}
            onInit={migrateDbIfNeeded}
            useSuspense
          >
            <Provider store={store}>
              <AudioProvider>
                <AppNavigator />
              </AudioProvider>
            </Provider>
          </SQLiteProvider>
        </Suspense>
      </ColorThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
