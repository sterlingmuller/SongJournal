import React, { useState } from 'react';
import {
  Platform,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { addArtistRequest } from '@src/state/sagas/actionCreators';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import Gap from '@src/components/common/components/Gap';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { sanitizeInput } from '@src/utils/sanitizeInput';
import {
  MAX_TITLE_LENGTH,
  PLACEHOLDER_TITLE,
} from '@src/components/common/constants';
import EditOrDeleteArtist from '../subcomponents/EditOrDeleteArtist';
import useEditOrAddArtistStyles from '@src/styles/editOrAddArtist';

interface Props {
  setIsNewArtistOpen: (value: boolean) => void;
}

const NewArtistModal = ({ setIsNewArtistOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = useEditOrAddArtistStyles();
  const displayTips = useAppSelector(selectDisplayTips);
  const { theme } = useColorTheme();

  const [newArtist, setNewArtist] = useState('');

  const onExitPress = () => {
    setIsNewArtistOpen(false);
    setNewArtist('');
  };

  const disabled: boolean = !newArtist;

  const onSavePress = () => {
    const sanitizedArtistName = sanitizeInput(newArtist);
    dispatch(addArtistRequest({ db, name: sanitizedArtistName }));
    setNewArtist('');
    setIsNewArtistOpen(false);
  };

  const handleArtistChange = (title: string) => {
    if (title.length <= MAX_TITLE_LENGTH) {
      setNewArtist(title);
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        isVisible
        avoidKeyboard
        onBackdropPress={onExitPress}
        hideModalContentWhileAnimating={true}
      >
        <Pressable style={styles.modalContainer} onPress={Keyboard.dismiss}>
          <StyledText style={styles.title}>Add or Edit Artist</StyledText>
          <View>
            <View style={styles.textbox}>
              <TextInput
                style={styles.newArtistInput}
                placeholder={PLACEHOLDER_TITLE}
                placeholderTextColor={theme.placeholderText}
                value={newArtist}
                onChangeText={handleArtistChange}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            <View style={styles.infoContainer}>
              <StyledText style={styles.infoText}>
                {newArtist.length}/{MAX_TITLE_LENGTH}
              </StyledText>
            </View>
            {displayTips ? (
              <StyledText style={{ ...styles.tipText, paddingBottom: 0 }}>
                Tip: New songs will be credited to the Default Artist. A
                song&apos;s artist can be changed on the Lyrics screen.
              </StyledText>
            ) : (
              <Gap />
            )}
          </View>
          <EditOrDeleteArtist />
          <View style={styles.buttons}>
            <SaveAndCancelButtons
              onPress={onSavePress}
              onExitPress={onExitPress}
              disabled={disabled}
            />
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NewArtistModal;
