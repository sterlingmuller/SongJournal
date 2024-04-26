import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import MusicPlayerScreen from '@src/screens/MusicPlayerScreen';
import { RootStackParamList } from '@src/common/types';
import headerStyles from '@src/styles/header';
import HeaderPageButton from '@src/songFolder/subcomponents/HeaderPageButton';

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen
            name="CurrentSongFolder"
            component={SongScreen}
            options={({ route }) => ({
              ...headerStyles,
              title: route.params.song.title,
              headerRight: () => <HeaderPageButton song={route.params.song} />,
            })}
          />
          <RootStack.Screen
            name="Lyrics"
            component={LyricsScreen}
            options={({ route }) => ({
              ...headerStyles,
              song: route.params.song,
            })}
          />
          <RootStack.Screen
            name="MusicPlayer"
            component={MusicPlayerScreen}
            options={{ ...headerStyles }}
          />
          <RootStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ ...headerStyles }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
