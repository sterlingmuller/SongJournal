import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import { RootStackParamList } from '@src/common/types';
import headerStyles from '@src/styles/header';

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen
          name="CurrentSongFolder"
          component={SongScreen}
          options={({ route }) => ({ ...headerStyles, title: route.params.currentSong })}
        />
        <RootStack.Screen
          name="Lyrics"
          component={LyricsScreen}
          options={({ route }) => ({ ...headerStyles, title: route.params.currentSong })}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ ...headerStyles }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
