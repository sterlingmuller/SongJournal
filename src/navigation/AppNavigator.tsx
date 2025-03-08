import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LyricsScreen from '@src/screens/LyricsScreen';
import { RootStackParamList } from '@src/components/common/types';
import useHeaderStyles from '@styles/header';
import { Screen } from '@src/components/common/enums';
import DefaultHeader from './subcomponents/DefaultHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import CoversScreen from '@src/screens/CoversScreen';
import SettingsScreen from '@src/screens/SettingsScreen';
import HomeScreenAudioContainer from '@src/screens/HomeScreenAudioContainer';
import SongScreenAudioContainer from '@src/screens/SongScreenAudioContainer';
import RecordingScreenAudioContainer from '@src/screens/RecordingScreenAudioContainer';

const AppNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();
  const title = useAppSelector(selectCurrentSongTitle);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Screen.HOME} id={undefined}>
        {/* <RootStack.Navigator initialRouteName={'TabNavigator'} id={undefined}> */}
        {/* <RootStack.Screen
          name={'TabNavigator'}
          component={TabNavigation}
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        /> */}

        <RootStack.Screen
          name={Screen.SONG}
          component={SongScreenAudioContainer}
          options={{
            header: () => <DefaultHeader title={title} screen={Screen.SONG} />,
          }}
        />
        <RootStack.Screen
          name={Screen.RECORDING}
          component={RecordingScreenAudioContainer}
          options={({
            route,
          }: {
            route: RouteProp<RootStackParamList, Screen.RECORDING>;
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
          name={Screen.HOME}
          component={HomeScreenAudioContainer}
        />
        <RootStack.Screen
          name={Screen.COVERS}
          component={CoversScreen}
          options={{
            header: () => <DefaultHeader title={Screen.COVERS} />,
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
