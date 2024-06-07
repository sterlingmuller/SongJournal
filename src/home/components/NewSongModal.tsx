import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { RootStackParamList } from '@src/common/types';
import StyledText from '@src/common/components/StyledText';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import useNewSongModalStyle from '@src/styles/newSongModal';
import { useSQLiteContext } from 'expo-sqlite';
import { useAppDispatch } from '@src/common/hooks';
import { createSongRequest } from '@src/sagas/actionCreators';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useNewSongModalStyle();

  const [songTitle, setSongTitle] = useState('');
  const onExitPress = () => {
    setIsNewSongOpen(false);
    setSongTitle('');
  };

  const disabled: boolean = !songTitle;

  const onSavePress = () => {
    dispatch(createSongRequest({ db, title: songTitle }));

    navigate('Song');
  };

  useEffect(
    () =>
      addListener('blur', () => {
        setIsNewSongOpen(false);
        setSongTitle('');
      }),
    [navigate],
  );

  return (
    <Modal
      isVisible={isNewSongOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Song title</StyledText>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Cobra Strike Alpha Deluxe"
            value={songTitle}
            onChangeText={(title: string) => setSongTitle(title)}
          />
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

export default NewSongModal;
