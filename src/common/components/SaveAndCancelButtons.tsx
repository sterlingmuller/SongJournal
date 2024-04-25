import saveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';
import React from 'react';
import { View, Button } from 'react-native';

interface Props {
  onPress: () => void;
  onExitPress: () => void;
  disabled: boolean;
  buttonsStyle?;
}

const SaveAndCancelButtons = (props: Props) => {
  const { buttonsStyle, onPress, onExitPress, disabled } = props;

  return (
    <View style={saveAndCancelButtonsStyle.buttons}>
      <View style={saveAndCancelButtonsStyle.button}>
        <Button
          title="Save"
          onPress={onPress}
          color="#81C2F1"
          disabled={disabled}
        />
      </View>
      <View style={saveAndCancelButtonsStyle.button}>
        <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
      </View>
    </View>
  );
};
export default SaveAndCancelButtons;
