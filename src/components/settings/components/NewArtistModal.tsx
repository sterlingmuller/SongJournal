import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import useNewSongModalStyle from '@src/styles/newTitleModal';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { addArtistRequest } from '@src/state/sagas/actionCreators';

interface Props {
  isNewArtistOpen: boolean;
  setIsNewArtistOpen: (value: boolean) => void;
}

const NewArtistModal = ({ isNewArtistOpen, setIsNewArtistOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = useNewSongModalStyle();

  const [newArtist, setNewArtist] = useState('');

  const onExitPress = () => {
    setIsNewArtistOpen(false);
    setNewArtist('');
  };

  const disabled: boolean = !newArtist;

  const onSavePress = () => {
    dispatch(addArtistRequest({ db, name: newArtist }));
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
              value={newArtist}
              onChangeText={(title: string) => setNewArtist(title)}
            />
          </View>
          <StyledText style={styles.tipText}>
            Tip: New songs will be credited to the default artist. A song's
            artist can be changed on the Lyrics screen.
          </StyledText>
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
