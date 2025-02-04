import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useRenameUpdateAndUpload from '@src/utils/hooks/useRenameUpdateAndUpload';

interface Props {
  titleToEdit: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
  };
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
  }) => void;
}

const EditTitleModal = ({ titleToEdit, setTitleToEdit }: Props) => {
  const styles = useCommonModalStyle();
  const { theme } = useColorTheme();
  const { updateAndUploadSongRename, updateAndUploadTakeRename } =
    useRenameUpdateAndUpload();

  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const {
    songTitle: originalSongTitle,
    songId,
    takeTitle: originalTakeTitle,
    takeId,
  } = titleToEdit;
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  const disabled: boolean = takeId
    ? updatedTitle === originalSongTitle || !updatedTitle
    : updatedTitle === originalTakeTitle || !updatedTitle;
  const modalTitle = takeId ? 'Edit Take Title' : 'Edit Song Title';

  useEffect(() => {
    takeId
      ? setUpdatedTitle(originalTakeTitle)
      : setUpdatedTitle(originalSongTitle);
  }, [titleToEdit]);

  const onExitPress = () => {
    setTitleToEdit({ songTitle: '', takeTitle: '', songId: -1, takeId: -1 });
    setUpdatedTitle('');
  };

  const clearInput = () => {
    setUpdatedTitle('');
  };

  const onSavePress = () => {
    if (takeId) {
      updateAndUploadTakeRename(
        originalSongTitle,
        originalTakeTitle,
        updatedTitle,
        songId,
        takeId,
      );
    } else {
      updateAndUploadSongRename(originalSongTitle, updatedTitle, songId);
    }

    onExitPress();
  };

  useEffect(() => addListener('blur', () => onExitPress()), [navigate]);

  return (
    <Modal
      isVisible={!!originalSongTitle}
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
