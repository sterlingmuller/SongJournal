import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import songDetailStyle from '@src/styles/songDetail';
import CheckIcon from '@src/icons/CheckIcon';

interface Props {
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
}

const CompletionStatus = ({ isCompleted, setIsCompleted }: Props) => (
  <View style={songDetailStyle.completedContainer}>
    <TouchableOpacity style={songDetailStyle.checkbox} onPress={() => setIsCompleted(!isCompleted)}>
      {isCompleted && <CheckIcon />}
    </TouchableOpacity>
    <Text style={songDetailStyle.text}>Completed</Text>
  </View>
);

export default CompletionStatus;
