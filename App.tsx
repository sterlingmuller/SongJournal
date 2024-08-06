import React, { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/context/ThemeContext';
import { store } from '@src/store/index';
import { migrateDbIfNeeded } from '@src/database/db';
import { AudioProvider } from '@src/context/AudioContext';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ColorThemeProvider>
      <Suspense fallback={null}>
        <SQLiteProvider
          databaseName="songjournal4.db"
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
