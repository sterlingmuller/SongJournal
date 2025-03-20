import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { Screen } from '@src/components/common/enums';
import { RootStackParamList } from '@src/components/common/types';
import HomeScreenAudioContainer from '@src/screens/HomeScreenAudioContainer';
import SetlistScreen from '@src/screens/SetlistScreen';
import CoversScreen from '@src/screens/CoversScreen';
import DefaultHeader from './subcomponents/DefaultHeader';
import PlaylistIcon from '@src/icons/PlaylistIcon';
import PersonIcon from '@src/icons/PersonIcon';
import { useColorTheme } from '@src/state/context/ThemeContext';
import CoversIcon from '@src/icons/CoversIcon';
import SettingIcon from '@src/icons/SettingIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useColorTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSettingsPress = () => {
    navigation.navigate(Screen.SETTINGS);
  };

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName={Screen.HOME}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.secondary,
        tabBarInactiveTintColor: theme.footerText,
        tabBarStyle: {
          flexDirection: 'row',
          backgroundColor: theme.primary,
          height: '7%',
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          alignSelf: 'center',
          paddingTop: '1%',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 5,
          fontWeight: 700,
        },
      }}
    >
      <Tab.Screen
        name={Screen.SETLIST}
        component={SetlistScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <PlaylistIcon focused={focused} />
          ),
          header: () => <DefaultHeader title={Screen.SETLIST} />,
        }}
      />
      <Tab.Screen
        name={Screen.HOME}
        component={HomeScreenAudioContainer}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <PersonIcon focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name={Screen.COVERS}
        component={CoversScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <CoversIcon focused={focused} />
          ),
          header: () => <DefaultHeader title={Screen.COVERS} />,
        }}
      />

      <Tab.Screen
        name={Screen.SETTINGS}
        listeners={{
          tabPress: (e: any) => {
            e.preventDefault();
            handleSettingsPress();
          },
        }}
        options={{
          tabBarIcon: () => <SettingIcon />,
        }}
      >
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
