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
import HeaderPageButton from '@src/components/songFolder/subcomponents/HeaderPageButton';
import useHeaderStyles from '@styles/header';
import HeaderBackButton from '@src/components/common/components/HeaderBackButton';
import { Screen } from '@src/components/common/enums';
import SetlistScreen from '@src/screens/SetlistScreen';
import CustomHeaderTitle from '@src/components/common/components/CustomHeaderTitle';
import { useColorTheme } from '@src/state/context/ThemeContext';

const AppNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const styles = useHeaderStyles();
  const { theme } = useColorTheme();

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Screen.HOME}>
        <RootStack.Screen name={Screen.HOME} component={HomeScreen} />
        <RootStack.Screen
          name={Screen.SONG}
          component={SongScreen}
          options={{
            ...styles,
            headerTintColor: theme.headerText,
            headerTitle: () => <CustomHeaderTitle />,
            headerRight: () => <HeaderPageButton />,
            headerLeft: () => <HeaderBackButton />,
            headerBackVisible: false,
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
            ...styles,
            animation: 'fade',
            title: route.params.title,
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
          options={{ ...styles }}
        />
        <RootStack.Screen
          name={Screen.SETLIST}
          component={SetlistScreen}
          options={{ ...styles }}
        />
        <RootStack.Screen
          name={Screen.SETTINGS}
          component={SettingsScreen}
          options={{ ...styles }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
