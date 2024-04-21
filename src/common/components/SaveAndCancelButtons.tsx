import saveAndCancelButtonsStyle from '@src/styles/saveAndCancelButtons';
import React from 'react';
import { View, Button } from 'react-native';

interface Props {
  // buttonsStyle;
  // onPress;
  // onExitPress;
}

const SaveAndCancelButtons = (props: Props) => (
  // const [buttonsStyle, onPress, onExitPress] = props;

  <View style={saveAndCancelButtonsStyle.buttons}>
    <View style={saveAndCancelButtonsStyle.button}>
      <Button title="Save" onPress={() => null} color="#81C2F1" />
    </View>
    <View style={saveAndCancelButtonsStyle.button}>
      <Button title="Cancel" color="#D6D6D6" onPress={() => null} />
    </View>
  </View>
);
export default SaveAndCancelButtons;
