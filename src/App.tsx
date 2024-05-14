import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/theme/ThemeContext';
import { store } from '@src/store/index';
import initDatabase from '@src/database/db';

const App = () => {
  useEffect(() => {
    initDatabase()
      .then(() => {
        console.log('db is a goin');
      })
      .catch((err) => {
        console.error("didn't work: ", err);
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorThemeProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ColorThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
