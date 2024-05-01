import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from '@src/navigation/AppNavigator';
import { ThemeProvider } from '@src/theme/ThemeContext';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  </GestureHandlerRootView>
);

export default App;
