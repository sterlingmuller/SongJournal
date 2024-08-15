import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { Take } from '@src/common/types';
import useTakeNotesModalStyles from '@styles/takeNotesModal';
import { EMPTY_TAKE } from '@src/common/constants';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { useSQLiteContext } from 'expo-sqlite';
import { updateTakeNotesRequest } from '@src/sagas/actionCreators';

interface Props {
  setCurrentTake: (value: Take) => void;
  currentTake: Take;
}

const NotesModal = (props: Props) => {
  const { setCurrentTake, currentTake } = props;
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const styles = useTakeNotesModalStyles();

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
    <Modal transparent visible={!!title}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <KeyboardAvoidingView style={styles.container}>
          <Text style={styles.title}>{title} Notes</Text>
          <View style={styles.textbox}>
            <TextInput
              style={styles.input}
              placeholder="Add notes for the current take..."
              value={newNote}
              onChangeText={(text: string) => setNewNote(text)}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={onExitPress}
            disabled={disabled}
          />
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotesModal;
