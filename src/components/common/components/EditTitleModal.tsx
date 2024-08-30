import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useNewSongModalStyle from '@src/styles/newSongModal';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { updateSongTitleRequest } from '@src/state/sagas/actionCreators';

interface Props {
  titleToEdit: { title: string; songId: number };
  setTitleToEdit: (value: { title: string; songId: number }) => void;
}

const EditTitleModal = ({ titleToEdit, setTitleToEdit }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useNewSongModalStyle();
  const { title: originalTitle, songId } = titleToEdit;
  const [updatedSongTitle, setUpdatedSongTitle] = useState<string>('');

  const disabled: boolean =
    updatedSongTitle === originalTitle || !updatedSongTitle;

  useEffect(() => {
    setUpdatedSongTitle(originalTitle);
  }, [titleToEdit]);

  const onExitPress = () => {
    setTitleToEdit({ title: '', songId: -1 });
    setUpdatedSongTitle('');
  };

  const clearInput = () => {
    setUpdatedSongTitle('');
  };

  const onSavePress = () => {
    dispatch(updateSongTitleRequest({ db, title: updatedSongTitle, songId }));

    onExitPress();
  };

  useEffect(() => addListener('blur', () => onExitPress()), [navigate]);

  return (
    <Modal
      isVisible={!!originalTitle}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Edit Song Title</StyledText>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new title"
            value={updatedSongTitle}
            onChangeText={(title: string) => setUpdatedSongTitle(title)}
          />
          {updatedSongTitle !== '' && (
            <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
              <StyledText style={styles.clearText}>X</StyledText>
            </TouchableOpacity>
          )}
        </View>
        <SaveAndCancelButtons
          onPress={onSavePress}
          onExitPress={onExitPress}
          disabled={disabled}
        />
      </View>
    </Modal>
  );
};

export default EditTitleModal;
