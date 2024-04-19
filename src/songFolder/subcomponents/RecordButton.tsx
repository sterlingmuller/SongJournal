import React from 'react';
import { TouchableOpacity } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import recordButtonStyles from '@src/styles/recordButton';

interface Props {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
}

const RecordButton = ({ isRecording, setIsRecording }: Props) => (
  <TouchableOpacity
    style={recordButtonStyles.container}
    onPress={() => setIsRecording(!isRecording)}
  >
    <RecordIcon />
  </TouchableOpacity>
);

export default RecordButton;
