import React, { useState, useEffect } from 'react';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';
import {} from 'react-native-keyboard-controller';

import { RootStackParamList } from '@src/components/common/types';
import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { createSongRequest } from '@src/state/sagas/actionCreators';
import { Screen } from '@src/components/common/enums';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import Gap from '@src/components/common/components/Gap';
import { useColorTheme } from '@src/state/context/ThemeContext';
import {
  MAX_TITLE_LENGTH,
  PLACEHOLDER_TITLE,
} from '@src/components/common/constants';
import { sanitizeInput } from '@src/utils/sanitizeInput';
import { useAudioPlayer } from '@src/state/context/AudioContext';

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
  const displayTips = useAppSelector(selectDisplayTips);
  const { theme } = useColorTheme();
  const { clearPlayback } = useAudioPlayer();

  const [songTitle, setSongTitle] = useState('');
  const onExitPress = () => {
    setIsNewSongOpen(false);
    setSongTitle('');
  };

  const disabled: boolean = !songTitle;

  const onSavePress = () => {
    const sanitizedTitle = sanitizeInput(songTitle);
    dispatch(createSongRequest({ db, title: sanitizedTitle }));

    clearPlayback();
    navigate(Screen.SONG);
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
    // <View>
    // <KeyboardAvoidingView>
    <Modal
      isVisible={isNewSongOpen}
      avoidKeyboard={true}
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
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
          {displayTips ? (
            <StyledText style={styles.tipText}>
              Tip: Double Tap the Title of a saved Song or Take to rename
            </StyledText>
          ) : (
            <Gap />
          )}
        </View>
        <SaveAndCancelButtons
          onPress={onSavePress}
          onExitPress={onExitPress}
          disabled={disabled}
        />
      </View>
    </Modal>
    // </KeyboardAvoidingView>
    // </View>
  );
};

export default NewSongModal;
