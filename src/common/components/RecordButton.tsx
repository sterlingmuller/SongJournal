import React from 'react';
import { TouchableOpacity } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import useRecordButtonStyles from '@src/styles/recordButton';
import StopRecordIcon from '@src/icons/StopRecordingIcon';

interface Props {
  onPress: () => void;
  isRecording: boolean;
}

const RecordButton = ({ onPress, isRecording }: Props) => {
  const styles = useRecordButtonStyles();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isRecording ? <StopRecordIcon /> : <RecordIcon />}
    </TouchableOpacity>
  );
};

export default RecordButton;
