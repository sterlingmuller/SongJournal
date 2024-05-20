import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import StopRecordIcon from '@src/icons/StopRecordingIcon';

interface Props {
  onPress: () => void;
  isRecording: boolean;
  style?: ViewStyle;
}

const RecordButton = ({ onPress, isRecording, style }: Props) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {isRecording ? <StopRecordIcon /> : <RecordIcon />}
    </TouchableOpacity>
  );
};

export default RecordButton;
