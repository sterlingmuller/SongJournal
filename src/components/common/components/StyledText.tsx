import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';

import useGlobalStyles from '@src/styles/global';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const StyledText = ({ children, style }: Props) => {
  const globalStyle = useGlobalStyles();

  return <Text style={[globalStyle.text, style]}>{children}</Text>;
};

export default StyledText;
