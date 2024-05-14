import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import MusicPlayerScreen from '@src/screens/MusicPlayerScreen';
import { RootStackParamList } from '@src/common/types';
import HeaderPageButton from '@src/songFolder/subcomponents/HeaderPageButton';
import useHeaderStyles from '@src/styles/header';
import { selectCurrentSongTitle } from '@src/selectors/currentSongSelector';

const AppNavigator = () => {
  const RootStack: any = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();

  const title = useSelector(selectCurrentSongTitle);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen
          name="Song"
          component={SongScreen}
          options={{
            ...styles,
            title,
            headerRight: () => <HeaderPageButton />,
          }}
        />
        <RootStack.Screen
          name="Lyrics"
          component={LyricsScreen}
          options={{ ...styles }}
        />
        <RootStack.Screen
          name="MusicPlayer"
          component={MusicPlayerScreen}
          options={{ ...styles }}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ ...styles }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
