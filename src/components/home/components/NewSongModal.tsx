import React, { useState, useEffect } from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { RootStackParamList, Song } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { createSongRequest } from '@src/state/sagas/actionCreators';
import { Screen } from '@src/components/common/enums';
import { useColorTheme } from '@src/state/context/ThemeContext';
import {
  MAX_TITLE_LENGTH,
  PLACEHOLDER_TITLE,
} from '@src/components/common/constants';
import { sanitizeInput } from '@src/utils/sanitizeInput';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { selectSongs } from '@src/state/selectors/songsSelector';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useCommonModalStyle();
  const { theme } = useColorTheme();
  const { clearPlayback } = useAudioPlayer();
  const songs = useAppSelector(selectSongs);

  const [songTitle, setSongTitle] = useState('');
  const [doesTitleExist, setDoesTitleExist] = useState(false);

  const onExitPress = () => {
    setIsNewSongOpen(false);
    setSongTitle('');
  };

  useEffect(() => {
    const normalizedTitle = songTitle?.trim().toLowerCase() || '';
    const titleAlreadyExists = normalizedTitle
      ? songs.some((song: Song) => song.title.toLowerCase() === normalizedTitle)
      : false;

    setDoesTitleExist(titleAlreadyExists);
  }, [songTitle, songs]);

  const disabled: boolean = !songTitle || doesTitleExist;

  const onSavePress = () => {
    if (!doesTitleExist) {
      const sanitizedTitle = sanitizeInput(songTitle);
      dispatch(createSongRequest({ db, title: sanitizedTitle }));

      clearPlayback();
      navigate(Screen.SONG);
    }
  };

  useEffect(
    () =>
      addListener('blur', () => {
        setIsNewSongOpen(false);
        setSongTitle('');
      }),
    [navigate],
  );

  const handleTitleChange = (title: string) => {
    if (title.length <= MAX_TITLE_LENGTH) {
      setSongTitle(title);
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        isVisible={isNewSongOpen}
        avoidKeyboard
        onBackdropPress={onExitPress}
        hideModalContentWhileAnimating={true}
        style={{ margin: 0 }}
        backdropTransitionOutTiming={0}
        animationInTiming={200}
      >
        <View style={styles.container}>
          <StyledText style={styles.title}>Song Title</StyledText>
          <View>
            <View style={styles.textbox}>
              <TextInput
                style={styles.input}
                placeholder={PLACEHOLDER_TITLE}
                placeholderTextColor={theme.placeholderText}
                value={songTitle}
                onChangeText={handleTitleChange}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.infoContainer}>
              <StyledText style={styles.infoText}>
                {songTitle.length}/{MAX_TITLE_LENGTH}
              </StyledText>
            </View>
            {doesTitleExist && (
              <StyledText style={styles.warningText}>
                You already have a Song with this Title
              </StyledText>
            )}
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

export default NewSongModal;
