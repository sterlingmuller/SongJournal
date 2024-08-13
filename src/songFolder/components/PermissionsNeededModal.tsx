import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { openSettings } from 'expo-linking';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import StyledText from '@src/common/components/StyledText';
import usePermissionsNeededModalStyles from '@styles/permissionsNeededModal';

interface Props {
  isPermissionsNeededModalOpen: boolean;
  setIsPermissionsNeededModalOpen: (value: boolean) => void;
}

const PermissionsNeededModal = ({
  isPermissionsNeededModalOpen,
  setIsPermissionsNeededModalOpen,
}: Props) => {
  const styles = usePermissionsNeededModalStyles();

  const onPress = () => {
    openSettings();
  };
  const onExitPress = () => {
    setIsPermissionsNeededModalOpen(false);
  };

  return (
    <Modal transparent visible={isPermissionsNeededModalOpen}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={styles.container}>
          <StyledText style={styles.title}>Permission Needed</StyledText>
          <StyledText style={styles.text}>
            To record songs, SongJournal needs access to your microphone. Please
            enable microphone access in your device settings.
          </StyledText>
          <View style={styles.buttons}>
            <SaveAndCancelButtons
              onPress={onPress}
              onExitPress={onExitPress}
              primaryLabel="Settings"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PermissionsNeededModal;
