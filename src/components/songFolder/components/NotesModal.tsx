import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
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
}

const NotesModal = (props: Props) => {
  const { setCurrentTake, currentTake } = props;
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const styles = useTakeNotesModalStyles();
  const { theme } = useColorTheme();

  const { notes, title, takeId, songId } = currentTake;
  const [newNote, setNewNote] = useState<string>(notes);

  useEffect(() => {
    setNewNote(notes);
  }, [currentTake]);

  const onSavePress = () => {
    dispatch(updateTakeNotesRequest({ db, takeId, songId, notes: newNote }));
    setCurrentTake(EMPTY_TAKE);
  };

  const onExitPress = () => {
    setCurrentTake(EMPTY_TAKE);
  };
  const disabled: boolean = newNote === notes;

  return (
    <Modal
      isVisible={!!title}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={styles.modal}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title} Notes</Text>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Add notes for the current take..."
            placeholderTextColor={theme.placeholderText}
            value={newNote}
            onChangeText={(text: string) => setNewNote(text)}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.buttonContainer}>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={onExitPress}
            disabled={disabled}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NotesModal;
