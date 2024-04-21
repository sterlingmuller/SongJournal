import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import songDetailStyle from '@src/styles/songDetail';

interface Props {
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
}

const CompletionStatus = ({ isCompleted, setIsCompleted }: Props) => (
  <View style={songDetailStyle.container}>
    <TouchableOpacity style={songDetailStyle.textbox} onPress={() => setIsCompleted(!isCompleted)}>
      <Text>{'\u2714'}</Text>
    </TouchableOpacity>
    <Text>Completed</Text>
  </View>
);

export default CompletionStatus;
