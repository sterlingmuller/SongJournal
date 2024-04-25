import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import newSongModalStyle from '@src/styles/newSongModal';
import { RootStackParamList } from '@src/common/types';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const { navigate, addListener } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const [songTitle, setSongTitle] = useState('');
  const onExitPress = () => setIsNewSongOpen(false);
  const disabled: boolean = !songTitle;

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
        style={newSongModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={newSongModalStyle.container}>
          <Text style={newSongModalStyle.title}>Song title</Text>
          <View style={newSongModalStyle.textbox}>
            <TextInput
              style={newSongModalStyle.input}
              placeholder="Cobra Strike Alpha Deluxe"
              value={songTitle}
              onChangeText={(title: string) => setSongTitle(title)}
            />
          </View>
          <SaveAndCancelButtons
            onPress={() =>
              navigate('CurrentSongFolder', { currentSong: songTitle })
            }
            onExitPress={() => setIsNewSongOpen(false)}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewSongModal;
