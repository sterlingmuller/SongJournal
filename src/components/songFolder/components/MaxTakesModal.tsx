import React from 'react';
import { Button, View } from 'react-native';
import Modal from 'react-native-modal';

import StyledText from '@src/components/common/components/StyledText';
import useCommonModalStyle from '@src/styles/commonModal';
import { useColorTheme } from '@src/state/context/ThemeContext';

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
    <Modal isVisible={isMaxTakesModalOpen} onBackdropPress={onExitPress}>
      <View style={styles.container}>
        <StyledText style={styles.title}>Max Take Limit</StyledText>
        <View>
          <StyledText style={styles.text}>
            You cannot have more than{' '}
            <StyledText style={styles.boldText}>seven</StyledText> takes of a
            song. To continue recording,{' '}
            <StyledText style={styles.boldText}>delete</StyledText> an unwanted
            take.
          </StyledText>
        </View>
        <View style={styles.button}>
          <Button
            title="Got it"
            onPress={onExitPress}
            color={theme.settingsEmphasis}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MaxTakesModal;
