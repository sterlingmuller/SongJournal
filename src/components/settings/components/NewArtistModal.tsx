import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
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
import { MAX_TITLE_LENGTH } from '@src/components/common/constants';
import EditOrDeleteArtist from '../subcomponents/EditOrDeleteArtist';
import useEditOrAddArtistStyles from '@src/styles/editOrAddArtist';

interface Props {
  isNewArtistOpen: boolean;
  setIsNewArtistOpen: (value: boolean) => void;
}

const NewArtistModal = ({ isNewArtistOpen, setIsNewArtistOpen }: Props) => {
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

  return (
    <Modal
      isVisible={isNewArtistOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.modalContainer}>
        <StyledText style={styles.title}>Add or Edit Artist</StyledText>
        <View>
          <View style={styles.textbox}>
            <TextInput
              style={styles.newArtistInput}
              placeholder="Cobra Strike Alpha Deluxe"
              placeholderTextColor={theme.secondaryText}
              value={newArtist}
              onChangeText={(title: string) => {
                if (title.length <= MAX_TITLE_LENGTH) {
                  setNewArtist(title);
                }
              }}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.infoContainer}>
            <StyledText style={styles.infoText}>
              {newArtist.length}/{MAX_TITLE_LENGTH}
            </StyledText>
          </View>
          {displayTips ? (
            <StyledText style={{ ...styles.tipText, paddingBottom: 0 }}>
              Tip: New Songs will be credited to the Default Artist. A Song's
              Artist can be changed on the Lyrics Screen.
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
      </View>
    </Modal>
  );
};

export default NewArtistModal;
