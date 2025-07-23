import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import StyledText from '@src/components/common/components/StyledText';
import useCommonModalStyle from '@src/styles/commonModal';
import { useColorTheme } from '@src/state/context/ThemeContext';
import StyledButton from '@src/components/common/components/StyledButton';

interface Props {
  isMaxTakesModalOpen: boolean;
  setIsMaxTakesModalOpen: (value: boolean) => void;
}

const MaxTakesModal = ({
  isMaxTakesModalOpen,
  setIsMaxTakesModalOpen,
}: Props) => {
  const styles = useCommonModalStyle();
  const { theme } = useColorTheme();

  const onExitPress = () => {
    setIsMaxTakesModalOpen(false);
  };

  return (
    <Modal
      isVisible={isMaxTakesModalOpen}
      onBackdropPress={onExitPress}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Max Take Limit</StyledText>
        <View>
          <StyledText style={styles.text}>
            You cannot have more than{' '}
            <StyledText style={[styles.warningText, { fontSize: 16 }]}>
              seven
            </StyledText>{' '}
            takes of a song. To continue recording,{' '}
            <StyledText style={[styles.warningText, { fontSize: 16 }]}>
              delete
            </StyledText>{' '}
            an unwanted take.
          </StyledText>
        </View>
        <View style={styles.button}>
          <StyledButton
            label="Got it"
            onPress={onExitPress}
            backgroundColor={theme.settingsEmphasis}
            textColor="white"
            buttonsStyle={{
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: 10,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MaxTakesModal;
