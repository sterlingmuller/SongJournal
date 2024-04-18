import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import { RootStackParamList } from '@src/common/types';

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Song" component={SongScreen} />
        <RootStack.Screen name="Lyrics" component={LyricsScreen} />
        <RootStack.Screen name="Settings" component={SettingsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
