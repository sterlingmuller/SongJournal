import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import MusicPlayerScreen from '@src/screens/MusicPlayerScreen';
import {
  RootStackParamList,
  lyricNavigation,
  songNavigation,
} from '@src/common/types';
import headerStyles from '@src/styles/header';
import HeaderPageButton from '@src/songFolder/subcomponents/HeaderPageButton';
import useHeaderStyles from '@src/styles/header';

const AppNavigator = () => {
  const RootStack: any = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen
          name="Song"
          component={SongScreen}
          options={({ route }: songNavigation) => ({
            ...styles,
            title: route.params.song.title,
            headerRight: () => <HeaderPageButton song={route.params.song} />,
          })}
        />
        <RootStack.Screen
          name="Lyrics"
          component={LyricsScreen}
          options={({ route }: lyricNavigation) => ({
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
  );
};

export default AppNavigator;
