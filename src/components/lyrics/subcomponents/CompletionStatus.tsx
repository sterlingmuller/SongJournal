import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CheckIcon from '@src/icons/CheckIcon';
import useSongDetailStyles from '@src/styles/songDetail';

interface Props {
  isCompleted: boolean;
  handleInputChange: () => void;
}

const CompletionStatus = ({ isCompleted, handleInputChange }: Props) => {
  const styles = useSongDetailStyles();

  return (
    <View style={styles.completedContainer}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleInputChange()}
        hitSlop={20}
      >
        {isCompleted ? <CheckIcon /> : null}
      </TouchableOpacity>
      <Text style={styles.text}>Completed</Text>
    </View>
  );
};

export default CompletionStatus;
