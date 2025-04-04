import React from 'react';
import { View } from 'react-native';
import { openSettings } from 'expo-linking';
import Modal from 'react-native-modal';

import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import StyledText from '@src/components/common/components/StyledText';
import useCommonModalStyle from '@src/styles/commonModal';

interface Props {
  isPermissionsNeededModalOpen: boolean;
  setIsPermissionsNeededModalOpen: (value: boolean) => void;
}

const PermissionsNeededModal = ({
  isPermissionsNeededModalOpen,
  setIsPermissionsNeededModalOpen,
}: Props) => {
  const styles = useCommonModalStyle();

  const onPress = () => {
    openSettings();
  };
  const onExitPress = () => {
    setIsPermissionsNeededModalOpen(false);
  };

  return (
    <Modal
      isVisible={isPermissionsNeededModalOpen}
      onBackdropPress={onExitPress}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Permission Needed</StyledText>
        <StyledText style={styles.text}>
          To record songs, Song Journal needs access to your microphone. Please
          enable microphone access in your device settings.
        </StyledText>
        <SaveAndCancelButtons
          onPress={onPress}
          onExitPress={onExitPress}
          primaryLabel="Settings"
        />
      </View>
    </Modal>
  );
};

export default PermissionsNeededModal;
