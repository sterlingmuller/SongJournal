import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CheckIcon from '@src/icons/CheckIcon';
import useSongDetailStyles from '@styles/songDetail';
import { SongInfo } from '@src/common/types';

interface Props {
  isCompleted: boolean;
  handleInputChange: (key: keyof SongInfo, value: boolean) => void;
}

const CompletionStatus = ({ isCompleted, handleInputChange }: Props) => {
  const styles = useSongDetailStyles();

  return (
    <View style={styles.completedContainer}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleInputChange('completed', !isCompleted)}
      >
        {isCompleted ? <CheckIcon /> : null}
      </TouchableOpacity>
      <Text style={styles.text}>Completed</Text>
    </View>
  );
};

export default CompletionStatus;
