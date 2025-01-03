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

// android oAuth: 667587402306-uc2610nddbofn6d4jmmqdctk6sjn2tfr.apps.googleusercontent.com

const App = () => (
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

export default App;
