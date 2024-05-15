import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SQLiteProvider } from 'expo-sqlite';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/theme/ThemeContext';
import { store } from '@src/store/index';
import { migrateDbIfNeeded } from '@src/database/db';

const App = () => {
  // useEffect(() => {
  //   migrateDbIfNeeded()
  //     .then(() => {
  //       console.log('db is a goin');
  //     })
  //     .catch((err) => {
  //       console.error("didn't work: ", err);
  //     });
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorThemeProvider>
        <SQLiteProvider
          databaseName="songjournal.db"
          onInit={migrateDbIfNeeded}
        >
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </SQLiteProvider>
      </ColorThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
