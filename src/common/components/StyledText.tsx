import useGlobalStyles from '@src/styles/global';
import React from 'react';
import { Text } from 'react-native';

interface Props {
  style?: any;
  children: any;
}

const StyledText = ({ children, style }: Props) => {
  const globalStyle = useGlobalStyles();

  return <Text style={[globalStyle.text, style]}>{children}</Text>;
};

export default StyledText;
