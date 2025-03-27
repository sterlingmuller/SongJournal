import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';

import useSaveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';
import StyledText from './StyledText';
import { colors as c } from '@src/theme/colors';

interface Props {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  buttonsStyle?: ViewStyle;
}

const StyledButton = (props: Props) => {
  const {
    onPress,
    label,
    disabled = false,
    backgroundColor = c.lightGray,
    textColor = c.black,
    buttonsStyle = null,
  } = props;
  const styles = useSaveAndCancelButtonsStyle();

  return (
    <View style={[styles.buttonContainer, buttonsStyle]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.buttonContainer,
          { backgroundColor: backgroundColor },
          disabled && styles.disabledButton,
        ]}
      >
        <StyledText style={[styles.buttonText, { color: textColor }]}>
          {label}
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};
export default StyledButton;
