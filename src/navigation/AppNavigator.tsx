import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreen from '@src/screens/SongScreen';
import RecordingScreen from '@src/screens/RecordingScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import HomeScreen from '@src/screens/HomeScreen';
import MusicPlayerScreen from '@src/screens/MusicPlayerScreen';
import { RootStackParamList } from '@src/components/common/types';
import useHeaderStyles from '@styles/header';
import { Screen } from '@src/components/common/enums';
import SetlistScreen from '@src/screens/SetlistScreen';
import DefaultHeader from './subcomponents/DefaultHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';

const AppNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();
  const title = useAppSelector(selectCurrentSongTitle);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Screen.HOME}>
        <RootStack.Screen name={Screen.HOME} component={HomeScreen} />
        <RootStack.Screen
          name={Screen.SONG}
          component={SongScreen}
          options={{
            header: () => <DefaultHeader title={title} screen={Screen.SONG} />,
          }}
        />
        <RootStack.Screen
          name={Screen.RECORDING}
          component={RecordingScreen}
          options={({
            route,
          }: {
            route: RouteProp<RootStackParamList, 'Recording'>;
          }) => ({
            animation: 'fade',
            header: () => <DefaultHeader title={route.params.title} />,
          })}
        />
        <RootStack.Screen
          name={Screen.LYRICS}
          component={LyricsScreen}
          options={{ ...styles }}
        />
        <RootStack.Screen
          name={Screen.MUSIC_PLAYER}
          component={MusicPlayerScreen}
          options={{
            header: () => <DefaultHeader title={Screen.MUSIC_PLAYER} />,
          }}
        />
        <RootStack.Screen
          name={Screen.SETLIST}
          component={SetlistScreen}
          options={{
            header: () => <DefaultHeader title={Screen.SETLIST} />,
          }}
        />
        <RootStack.Screen
          name={Screen.SETTINGS}
          component={SettingsScreen}
          options={{
            header: () => <DefaultHeader title={Screen.SETTINGS} />,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
