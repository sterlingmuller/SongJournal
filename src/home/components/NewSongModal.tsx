import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { RootStackParamList, createSongResult } from '@src/common/types';
import StyledText from '@src/common/components/StyledText';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import useNewSongModalStyle from '@src/styles/newSongModal';
import { useSQLiteContext } from 'expo-sqlite';
import { createSong } from '@src/repositories/SongsRepository';
import { setCurrentSong } from '@src/slice/currentSongSlice';
import { useAppDispatch } from '@src/common/hooks';
import { addSong } from '@src/slice/songsSlice';

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
  const onExitPress = () => setIsNewSongOpen(false);

  const disabled: boolean = !songTitle;

  const onSavePress = async () => {
    const result: createSongResult = await createSong(db, songTitle);
    const { songId, title, selectedTakeId, totalTakes } = result;

    dispatch(setCurrentSong({ ...result, takes: [] }));
    dispatch(addSong({ songId, title, selectedTakeId, totalTakes }));

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
    <Modal transparent visible={isNewSongOpen}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
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
            onExitPress={() => setIsNewSongOpen(false)}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewSongModal;
