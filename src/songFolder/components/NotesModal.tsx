import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

import takeNotesModalStyle from '@styles/takeNotesModal';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

interface Props {
  isNotesModalOpen: string;
  setIsNotesModalOpen: (title: string) => void;
}

const NotesModal = ({ isNotesModalOpen, setIsNotesModalOpen }: Props) => {
  const [notes, setNotes] = useState<string>('');

  const onExitPress = () => setIsNotesModalOpen('');
  const disabled: boolean = !notes;

  return (
    <Modal transparent visible={!!isNotesModalOpen}>
      <TouchableOpacity
        style={takeNotesModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={takeNotesModalStyle.container}>
          <Text style={takeNotesModalStyle.title}>
            {isNotesModalOpen} Notes
          </Text>
          <View style={takeNotesModalStyle.textbox}>
            <TextInput
              style={takeNotesModalStyle.input}
              placeholder="Add notes for the current take..."
              value={notes}
              onChangeText={(text: string) => setNotes(text)}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <SaveAndCancelButtons
            onPress={() => null}
            onExitPress={() => setIsNotesModalOpen('')}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotesModal;
