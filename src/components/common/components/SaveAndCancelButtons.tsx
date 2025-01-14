import React from 'react';
import { View, Button } from 'react-native';

import useSaveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';

interface Props {
  onPress: () => void;
  onExitPress: () => void;
  disabled?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  buttonsStyle?;
  primaryColor?: string;
  secondaryColor?: string;
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
    secondaryColor = '#D6D6D6',
  } = props;
  const styles = useSaveAndCancelButtonsStyle();

  return (
    <View style={{ ...styles.buttons, ...buttonsStyle }}>
      <View style={styles.button}>
        <Button
          title={primaryLabel}
          onPress={onPress}
          color={primaryColor}
          disabled={disabled}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={secondaryLabel}
          color={secondaryColor}
          onPress={onExitPress}
        />
      </View>
    </View>
  );
};
export default SaveAndCancelButtons;
