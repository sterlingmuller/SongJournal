import React from 'react';
import { TouchableOpacity } from 'react-native';

import RecordIcon from '@src/icons/RecordIcon';
import useRecordButtonStyles from '@src/styles/recordButton';

interface Props {
  isPermissionGranted: boolean;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  setIsPermissionsNeededModalOpen: (value: boolean) => void;
}

const RecordButton = (props: Props) => {
  const {
    isPermissionGranted,
    isRecording,
    setIsRecording,
    setIsPermissionsNeededModalOpen,
  } = props;
  const styles = useRecordButtonStyles();

  const onPress = () => {
    isPermissionGranted
      ? console.log('will record!')
      : setIsPermissionsNeededModalOpen(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RecordIcon />
    </TouchableOpacity>
  );
};

export default RecordButton;
