import React from 'react';
import { View, Button } from 'react-native';

import useSaveAndCancelButtonsStyle from '@styles/saveAndCancelButtons';

interface Props {
  onPress: () => void;
  onExitPress: () => void;
  disabled?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  buttonsStyle?;
}

const SaveAndCancelButtons = (props: Props) => {
  const {
    onPress,
    onExitPress,
    disabled = false,
    primaryLabel = 'Save',
    secondaryLabel = 'Cancel',
    buttonsStyle,
  } = props;
  const styles = useSaveAndCancelButtonsStyle();

  return (
    <View style={{ ...styles.buttons, ...buttonsStyle }}>
      <View style={styles.button}>
        <Button
          title={primaryLabel}
          onPress={onPress}
          color="#81C2F1"
          disabled={disabled}
        />
      </View>
      <View style={styles.button}>
        <Button title={secondaryLabel} color="#D6D6D6" onPress={onExitPress} />
      </View>
    </View>
  );
};
export default SaveAndCancelButtons;
