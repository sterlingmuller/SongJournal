import React from 'react';
import { View } from 'react-native';
import useCommonStyle from '@src/styles/common';

const Separator = () => {
  const styles = useCommonStyle();

  return <View style={styles.separator} />;
};

export default Separator;
