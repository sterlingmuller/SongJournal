import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import newSongModalStyle from '@styles/newSongModal';

interface Props {
  isNewSongOpen: boolean;
  setIsNewSongOpen: (value: boolean) => void;
}

const NewSongModal = ({ isNewSongOpen, setIsNewSongOpen }: Props) => {
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [songTitle, setSongTitle] = useState('');

  const onExitPress = () => setIsNewSongOpen(false);

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
              onChangeText={(title) => setSongTitle(title)}
            />
          </View>
          <View style={newSongModalStyle.buttons}>
            <View style={newSongModalStyle.button}>
              <Button
                title="Save"
                color="#81C2F1"
                onPress={() => navigate('Song')}
              />
            </View>
            <View style={newSongModalStyle.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NewSongModal;
