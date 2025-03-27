import React from 'react';
import { View, ViewStyle } from 'react-native';

import useSaveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';
import StyledButton from './StyledButton';

interface Props {
  onPress: () => void;
  onExitPress: () => void;
  disabled?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  buttonsStyle?: ViewStyle;
  primaryColor?: string;
  secondaryColor?: string;
  primaryTextColor?: string;
}

const SaveAndCancelButtons = (props: Props) => {
  const {
    onPress,
    onExitPress,
    disabled = false,
    primaryLabel = 'Save',
    secondaryLabel = 'Cancel',
    buttonsStyle,
    primaryColor = '#81C2F1',
    primaryTextColor = '#fff',
  } = props;
  const styles = useSaveAndCancelButtonsStyle();

  return (
    <View style={{ ...styles.buttons, ...buttonsStyle }}>
      <StyledButton onPress={onExitPress} label={secondaryLabel} />
      <StyledButton
        onPress={onPress}
        disabled={disabled}
        label={primaryLabel}
        backgroundColor={primaryColor}
        textColor={primaryTextColor}
      />
    </View>
  );
};
export default SaveAndCancelButtons;
