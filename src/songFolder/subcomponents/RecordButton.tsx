import React from 'react';
import { TouchableOpacity } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import useRecordButtonStyles from '@src/styles/recordButton';

interface Props {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
}

const RecordButton = ({ isRecording, setIsRecording }: Props) => {
  const styles = useRecordButtonStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsRecording(!isRecording)}
    >
      <RecordIcon />
    </TouchableOpacity>
  );
};

export default RecordButton;
