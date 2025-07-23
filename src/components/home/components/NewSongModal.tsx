import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Keyboard } from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { RootStackParamList, Song } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useSongModalStyle from '@src/styles/songModal';
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
import AboutArtist from '@src/components/lyrics/subcomponents/AboutArtist';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const textInputRef = useRef<TextInput>(null);
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const styles = useSongModalStyle();
  const { theme } = useColorTheme();
  const { clearPlayback } = useAudioPlayer();
  const songs = useAppSelector(selectSongs);

  const [songTitle, setSongTitle] = useState('');
  const [doesTitleExist, setDoesTitleExist] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<number>(-1);

  const isCoversScreen = route.name === Screen.COVERS;

  const onExitPress = () => {
    setIsNewSongOpen(false);
    setSongTitle('');
    setSelectedArtistId(-1);
  };

  useEffect(() => {
    if (isNewSongOpen && !isCoversScreen) {
      setTimeout(() => {
        textInputRef?.current?.focus();
      }, 200);
    }
  }, [isNewSongOpen]);

  useEffect(() => {
    const normalizedTitle = songTitle?.trim().toLowerCase() || '';
    const titleAlreadyExists = normalizedTitle
      ? songs.some((song: Song) => song.title.toLowerCase() === normalizedTitle)
      : false;

    setDoesTitleExist(titleAlreadyExists);
  }, [songTitle, songs]);

  const disabled: boolean =
    !songTitle || doesTitleExist || (isCoversScreen && selectedArtistId === -1);

  const onSavePress = () => {
    if (!doesTitleExist) {
      const sanitizedTitle = sanitizeInput(songTitle);
      const isOriginal = !isCoversScreen;
      dispatch(
        createSongRequest({
          db,
          title: sanitizedTitle,
          isOriginal,
          artistId: isCoversScreen ? selectedArtistId : undefined,
        })
      );

      clearPlayback();
      navigate(Screen.SONG);
    }
  };

  useEffect(
    () =>
      addListener('blur', () => {
        setIsNewSongOpen(false);
        setSongTitle('');
        setSelectedArtistId(-1);
      }),
    [navigate]
  );

  const handleTitleChange = (title: string) => {
    if (title.length <= MAX_TITLE_LENGTH) {
      setSongTitle(title);
    }
  };

  return (
    <Modal
      isVisible={isNewSongOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      hideModalContentWhileAnimating={true}
    >
      <Pressable
        style={[styles.container, { maxHeight: undefined }]}
        onPress={Keyboard.dismiss}
      >
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
              ref={textInputRef}
              autoCorrect={false}
            />
          </View>
          <View style={styles.infoContainer}>
            <StyledText style={styles.infoText}>
              {songTitle.length}/{MAX_TITLE_LENGTH}
            </StyledText>
          </View>
        </View>
        {isCoversScreen && (
          <AboutArtist
            selectedArtistId={selectedArtistId}
            setSelectedArtistId={setSelectedArtistId}
            textInputRef={textInputRef}
          />
        )}
        {doesTitleExist && (
          <StyledText style={styles.warningText}>
            You already have a Song with this Title
          </StyledText>
        )}
        <SaveAndCancelButtons
          onPress={onSavePress}
          onExitPress={onExitPress}
          disabled={disabled}
        />
      </Pressable>
    </Modal>
  );
};

export default NewSongModal;
