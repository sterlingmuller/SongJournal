import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

import takeNotesModalStyle from '@styles/takeNotesModal';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { take } from '@src/common/types';
import { EMPTY_TAKE } from '@src/common/constants';

interface Props {
  isNotesModalOpen: boolean;
  setIsNotesModalOpen: (value: boolean) => void;
  setCurrentTake: (value: take) => void;
  currentTake: take;
}

const NotesModal = (props: Props) => {
  const { isNotesModalOpen, setIsNotesModalOpen, setCurrentTake, currentTake } =
    props;

  const { notes, title } = currentTake;

  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    setNewNote(notes);
  }, [isNotesModalOpen, setNewNote]);

  const onExitPress = () => {
    setCurrentTake(EMPTY_TAKE);
    setIsNotesModalOpen(false);
  };
  const disabled: boolean = newNote === notes;

  return (
    <Modal transparent visible={isNotesModalOpen}>
      <TouchableOpacity
        style={takeNotesModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={takeNotesModalStyle.container}>
          <Text style={takeNotesModalStyle.title}>{title} Notes</Text>
          <View style={takeNotesModalStyle.textbox}>
            <TextInput
              style={takeNotesModalStyle.input}
              placeholder="Add notes for the current take..."
              value={newNote}
              onChangeText={(text: string) => setNewNote(text)}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <SaveAndCancelButtons
            onPress={() => null}
            onExitPress={onExitPress}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotesModal;
