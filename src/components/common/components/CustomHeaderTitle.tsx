import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';
import { useColorTheme } from '@src/state/context/ThemeContext';

const CustomHeaderTitle = () => {
  const title = useAppSelector(selectCurrentSongTitle);
  const { theme } = useColorTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { color: theme.headerText }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    width: '80%',
  },
});

export default CustomHeaderTitle;
