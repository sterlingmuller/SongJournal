import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useRenameSongUpdateAndUpload from '@src/utils/hooks/useRenameUpdateAndUpload';

interface Props {
  titleToEdit: { title: string; songId: number; takeId?: number };
  setTitleToEdit: (value: {
    title: string;
    songId: number;
    takeId?: number;
  }) => void;
}

const EditTitleModal = ({ titleToEdit, setTitleToEdit }: Props) => {
  const styles = useCommonModalStyle();
  const { theme } = useColorTheme();
  const { updateAndUploadSongRename } = useRenameSongUpdateAndUpload();

  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { title: originalTitle, songId, takeId } = titleToEdit;
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  const disabled: boolean = updatedTitle === originalTitle || !updatedTitle;
  const modalTitle = takeId ? 'Edit Take Title' : 'Edit Song Title';

  useEffect(() => {
    setUpdatedTitle(originalTitle);
  }, [titleToEdit]);

  const onExitPress = () => {
    setTitleToEdit({ title: '', songId: -1, takeId: -1 });
    setUpdatedTitle('');
  };

  const clearInput = () => {
    setUpdatedTitle('');
  };

  const onSavePress = () => {
    if (takeId) {
      // dropbox this
      // dispatch(updateTakeTitleRequest({ title: updatedTitle, songId, takeId }));
    } else {
      updateAndUploadSongRename(originalTitle, updatedTitle, songId);
    }

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
        <StyledText style={styles.title}>{modalTitle}</StyledText>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new title"
            placeholderTextColor={theme.secondaryText}
            value={updatedTitle}
            onChangeText={(title: string) => setUpdatedTitle(title)}
          />
          {updatedTitle !== '' && (
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
