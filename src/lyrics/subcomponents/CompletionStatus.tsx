import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CheckIcon from '@src/icons/CheckIcon';
import useSongDetailStyles from '@src/styles/songDetail';

interface Props {
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
}

const CompletionStatus = ({ isCompleted, setIsCompleted }: Props) => {
  const styles = useSongDetailStyles();

  return (
    <View style={styles.completedContainer}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setIsCompleted(!isCompleted)}
      >
        {isCompleted && <CheckIcon />}
      </TouchableOpacity>
      <Text style={styles.text}>Completed</Text>
    </View>
  );
};

export default CompletionStatus;
