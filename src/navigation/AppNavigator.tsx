import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SongScreen from '@src/screens/SongScreen';
import RecordingScreen from '@src/screens/RecordingScreen';
import LyricsScreen from '@src/screens/LyricsScreen';
import { RootStackParamList } from '@src/components/common/types';
import useHeaderStyles from '@styles/header';
import { Screen } from '@src/components/common/enums';
import DefaultHeader from './subcomponents/DefaultHeader';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import TabNavigation from '@src/navigation/TabNavigation';
import HomeScreen from '@src/screens/HomeScreen';
import CoversScreen from '@src/screens/CoversScreen';
import SettingsScreen from '@src/screens/SettingsScreen';

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
        <RootStack.Screen name={Screen.HOME} component={HomeScreen} />
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
