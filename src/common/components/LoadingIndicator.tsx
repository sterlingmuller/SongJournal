import useLoadingIndicatorStyles from '@src/styles/loadingIndicator';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => {
  const styles = useLoadingIndicatorStyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingIndicator;
