import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LyricsScreen from '@src/screens/LyricsScreen';
import { RootStackParamList } from '@src/components/common/types';
import useHeaderStyles from '@styles/header';
import { Screen } from '@src/components/common/enums';
import DefaultHeader from '@src/navigation/subcomponents/DefaultHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import SettingsScreen from '@src/screens/SettingsScreen';
import SongScreenAudioContainer from '@src/screens/SongScreenAudioContainer';
import RecordingScreenAudioContainer from '@src/screens/RecordingScreenAudioContainer';
import TabNavigator from '@src/navigation/TabNavigator';

const AppNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();
  const title = useAppSelector(selectCurrentSongTitle);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Screen.TABS} id={undefined}>
        <RootStack.Screen
          name={Screen.TABS}
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={Screen.SONG}
          component={SongScreenAudioContainer}
          options={{
            animation: 'slide_from_right',
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
            presentation: 'transparentModal',
            animation: 'fade',
            header: () => <DefaultHeader title={route.params.title} />,
          })}
        />
        <RootStack.Screen
          name={Screen.LYRICS}
          component={LyricsScreen}
          options={{ ...styles, animation: 'slide_from_right' }}
        />
        <RootStack.Screen
          name={Screen.SETTINGS}
          component={SettingsScreen}
          options={{
            presentation: 'transparentModal',
            header: () => <DefaultHeader title={Screen.SETTINGS} />,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
