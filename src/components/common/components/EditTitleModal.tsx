import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useRenameUpdateAndUpload from '@src/utils/hooks/useRenameUpdateAndUpload';
import { MAX_TITLE_LENGTH } from '@src/components/common/constants';
import { sanitizeInput } from '@src/utils/sanitizeInput';

interface Props {
  titleToEdit: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
    artistId?: number;
    hasLyrics?: boolean;
  };
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
    artistId?: number;
    hasLyrics?: boolean;
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
    artistId,
    hasLyrics,
  } = titleToEdit;
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

  const disabled: boolean = takeId
    ? updatedTitle === originalTakeTitle || !updatedTitle
    : updatedTitle === originalSongTitle || !updatedTitle;
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
    const sanitizedTitle = sanitizeInput(updatedTitle);

    if (takeId) {
      updateAndUploadTakeRename(
        originalSongTitle,
        originalTakeTitle,
        sanitizedTitle,
        songId,
        takeId,
      );
    } else {
      updateAndUploadSongRename(
        originalSongTitle,
        sanitizedTitle,
        songId,
        artistId,
        hasLyrics,
      );
    }

    onExitPress();
  };

  useEffect(() => addListener('blur', () => onExitPress()), [navigate]);

  const handleTitleChange = (title: string) => {
    if (title.length <= MAX_TITLE_LENGTH) {
      setUpdatedTitle(title);
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        isVisible={!!originalSongTitle}
        avoidKeyboard
        onBackdropPress={onExitPress}
      >
        <View style={styles.container}>
          <StyledText style={styles.title}>{modalTitle}</StyledText>
          <View>
            <View style={styles.textbox}>
              <TextInput
                style={styles.input}
                placeholder="Enter a new title"
                placeholderTextColor={theme.secondaryText}
                value={updatedTitle}
                onChangeText={handleTitleChange}
              />
              {updatedTitle !== '' && (
                <TouchableOpacity
                  onPress={clearInput}
                  style={styles.clearButton}
                >
                  <StyledText style={styles.boldText}>X</StyledText>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.infoContainer}>
              <StyledText style={styles.infoText}>
                {updatedTitle.length}/{MAX_TITLE_LENGTH}
              </StyledText>
            </View>
          </View>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={onExitPress}
            disabled={disabled}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default EditTitleModal;
