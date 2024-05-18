import StyledText from '@src/common/components/StyledText';
import React from 'react';
import { View } from 'react-native';

import RecordButton from '@src/common/components/RecordButton';
import useGlobalStyles from '@src/styles/global';

const RecordingScreen = () => {
  const globalStyles = useGlobalStyles();

  return (
    <View style={globalStyles.container}>
      <StyledText>Recording Screen hrm</StyledText>
      <RecordButton onPress={() => console.log('Record pressed')} />
    </View>
  );
};

export default RecordingScreen;
