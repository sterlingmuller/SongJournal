import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from '@src/navigation/AppNavigator';
import { ColorThemeProvider } from '@src/theme/ThemeContext';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ColorThemeProvider>
      <AppNavigator />
    </ColorThemeProvider>
  </GestureHandlerRootView>
);

export default App;
