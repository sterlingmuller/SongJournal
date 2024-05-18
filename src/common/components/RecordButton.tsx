import React from 'react';
import { TouchableOpacity } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import useRecordButtonStyles from '@src/styles/recordButton';

interface Props {
  onPress: () => void;
}

const RecordButton = ({ onPress }: Props) => {
  const styles = useRecordButtonStyles();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RecordIcon />
    </TouchableOpacity>
  );
};

export default RecordButton;
