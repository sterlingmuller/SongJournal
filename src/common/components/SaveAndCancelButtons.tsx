import React from 'react';
import { View, Button } from 'react-native';

import useSaveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';

interface Props {
  onPress: () => void;
  onExitPress: () => void;
  disabled: boolean;
}

const SaveAndCancelButtons = (props: Props) => {
  const { onPress, onExitPress, disabled } = props;
  const styles = useSaveAndCancelButtonsStyle();

  return (
    <View style={styles.buttons}>
      <View style={styles.button}>
        <Button
          title="Save"
          onPress={onPress}
          color="#81C2F1"
          disabled={disabled}
        />
      </View>
      <View style={styles.button}>
        <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
      </View>
    </View>
  );
};
export default SaveAndCancelButtons;
