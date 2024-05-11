import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/theme/ThemeContext';
import store from '@src/store/index';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ColorThemeProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ColorThemeProvider>
  </GestureHandlerRootView>
);

export default App;
