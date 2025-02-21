import React from 'react';
import { Text, View } from 'react-native';
import SettingsScreen from '@src/screens/SettingsScreen';

import { Screen } from '@src/components/common/enums';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@src/screens/HomeScreen';
import CoversScreen from '@src/screens/CoversScreen';
import DefaultHeader from './subcomponents/DefaultHeader';
import HomeIcon from '@src/icons/HomeIcon';
import SettingIcon from '@src/icons/SettingIcon';
import CoversIcon from '@src/icons/CoversIcon';
import { useColorTheme } from '@src/state/context/ThemeContext';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { theme } = useColorTheme();

  return (
    <Tab.Navigator
      initialRouteName={Screen.HOME}
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: '2%',
          marginLeft: '2%',
          marginRight: '2%',
          borderRadius: 50,
          backgroundColor: theme.primary,
        },
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let IconComponent;
          switch (route.name) {
            case Screen.HOME:
              IconComponent = HomeIcon;
              break;
            case Screen.COVERS:
              IconComponent = CoversIcon;
              break;
            case Screen.SETTINGS:
              IconComponent = SettingIcon;
              break;
            default:
              IconComponent = HomeIcon;
          }
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                padding: focused && 2,
                gap: 8,
                marginTop: 8,
                backgroundColor: focused && theme.secondary,
                borderRadius: 50,
              }}
            >
              <IconComponent />
              {focused && (
                <Text
                  style={{
                    fontWeight: 'bold',
                    width: 80,
                    color: theme.primary,
                    fontSize: 20,
                  }}
                >
                  {route.name}
                </Text>
              )}
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
        },
      })}
      id={undefined}
    >
      <Tab.Screen name={Screen.HOME} component={HomeScreen} />
      <Tab.Screen
        name={Screen.COVERS}
        component={CoversScreen}
        options={{
          header: () => <DefaultHeader title={Screen.COVERS} />,
        }}
      />
      <Tab.Screen
        name={Screen.SETTINGS}
        component={SettingsScreen}
        options={{
          header: () => <DefaultHeader title={Screen.SETTINGS} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
