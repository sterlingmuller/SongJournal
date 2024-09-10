import React, { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/state/context/ThemeContext';
import { store } from '@src/state/store/index';
import { migrateDbIfNeeded } from '@src/data/database/db';
import { AudioProvider } from '@src/state/context/AudioContext';
import { dbName } from '@src/components/common/constants';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ColorThemeProvider>
      <Suspense fallback={null}>
        <SQLiteProvider
          databaseName={dbName}
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

export default App;
