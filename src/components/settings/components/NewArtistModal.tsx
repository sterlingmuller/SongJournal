import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useCommonModalStyle from '@src/styles/commonModal';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { addArtistRequest } from '@src/state/sagas/actionCreators';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import Gap from '@src/components/common/components/Gap';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { sanitizeInput } from '@src/utils/sanitizeInput';

interface Props {
  isNewArtistOpen: boolean;
  setIsNewArtistOpen: (value: boolean) => void;
}

const NewArtistModal = ({ isNewArtistOpen, setIsNewArtistOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = useCommonModalStyle();
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
      <View style={styles.container}>
        <StyledText style={styles.title}>Add New Artist</StyledText>
        <View>
          <View style={styles.textbox}>
            <TextInput
              style={styles.input}
              placeholder="Cobra Strike Alpha Deluxe"
              placeholderTextColor={theme.secondaryText}
              value={newArtist}
              onChangeText={(title: string) => {
                setNewArtist(title);
              }}
            />
          </View>
          {displayTips ? (
            <StyledText style={{ ...styles.tipText, paddingBottom: 0 }}>
              Tip: New songs will be credited to the default artist. A song's
              artist can be changed on the Lyrics screen.
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
  );
};

export default NewArtistModal;
