import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '@src/screens/SettingsScreen';
import ConnectionSuccessScreen from '@src/screens/ConnectionSuccessScreen';
import { Screen } from '@src/components/common/enums';
import { RootStackParamList } from '@src/components/common/types';
import useHeaderStyles from '@src/styles/header';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SettingsStack = () => {
  const styles = useHeaderStyles();

  return (
    <Stack.Navigator initialRouteName={Screen.SETTINGS}>
      <Stack.Screen
        name={Screen.SETTINGS}
        component={SettingsScreen}
        options={{ ...styles }}
      />
      <Stack.Screen
        name={Screen.CONNECTION_SUCCESS}
        component={ConnectionSuccessScreen}
        options={{ ...styles }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
