import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import Modal from 'react-native-modal';

import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { Take } from '@src/components/common/types';
import useTakeNotesModalStyles from '@src/styles/takeNotesModal';
import { EMPTY_TAKE } from '@src/components/common/constants';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { useSQLiteContext } from 'expo-sqlite';
import { updateTakeNotesRequest } from '@src/state/sagas/actionCreators';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  setCurrentTake: (value: Take) => void;
  currentTake: Take;
  setIsNotesOpen: (value: boolean) => void;
  isNotesOpen: boolean;
}

const NotesModal = (props: Props) => {
  const { setCurrentTake, currentTake, setIsNotesOpen, isNotesOpen } = props;
  const textInputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const styles = useTakeNotesModalStyles();
  const { theme } = useColorTheme();

  const { notes, title, takeId, songId } = currentTake;
  const [newNote, setNewNote] = useState<string>(notes);

  useEffect(() => {
    setNewNote(notes);

    if (isNotesOpen) {
      setTimeout(() => {
        if(!notes) {textInputRef?.current?.focus();}
      }, 200);
  }
  }, [currentTake]);

  const onSavePress = () => {
    dispatch(updateTakeNotesRequest({ db, takeId, songId, notes: newNote }));
    setIsNotesOpen(false);
  };

  const disabled: boolean = newNote === notes;

  return (
    <Modal
      isVisible={isNotesOpen}
      avoidKeyboard
      onBackdropPress={() => setIsNotesOpen(false)}
      style={styles.modal}
      hideModalContentWhileAnimating={true}
      onModalHide={() => setCurrentTake(EMPTY_TAKE)}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.title}>{title} Notes</Text>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Add notes for the current take"
            placeholderTextColor={theme.placeholderText}
            value={newNote}
            onChangeText={(text: string) => setNewNote(text)}
            multiline={true}
            textAlignVertical="top"
            ref={textInputRef}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={() => setIsNotesOpen(false)}
            disabled={disabled}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default NotesModal;
