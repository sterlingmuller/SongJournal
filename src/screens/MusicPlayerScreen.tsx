import useGlobalStyles from '@src/styles/global';
import React from 'react';
import { View, Text } from 'react-native';

const MusicPlayerScreen = () => {
  const globalStyles = useGlobalStyles();

  return (
    <View style={globalStyles.container}>
      <Text>Music Player Screen</Text>
    </View>
  );
};

export default MusicPlayerScreen;
