import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, TextInput,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import takeNotesModalStyle from '@styles/takeNotesModal';
import { RootStackParamList } from '@src/common/types';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

interface Props {
  isNotesModalOpen: string;
  setIsNotesModalOpen: (title: string) => void;
}

const NotesModal = ({ isNotesModalOpen, setIsNotesModalOpen }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [notes, setNotes] = useState<string>('');

  const onExitPress = () => setIsNotesModalOpen('');

  return (
    <Modal transparent visible={!!isNotesModalOpen}>
      <TouchableOpacity
        style={takeNotesModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={takeNotesModalStyle.container}>
          <Text style={takeNotesModalStyle.title}>{isNotesModalOpen} Notes</Text>
          <View style={takeNotesModalStyle.textbox}>
            <TextInput
              style={takeNotesModalStyle.input}
              placeholder="Add notes for the current take..."
              value={notes}
              onChangeText={(newNotes) => setNotes(newNotes)}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          {/* <View style={takeNotesModalStyle.buttons}>
            <View style={takeNotesModalStyle.button}>
              <Button title="Save" color="#81C2F1" onPress={() => navigate('CurrentSongFolder')} />
            </View>
            <View style={takeNotesModalStyle.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View> */}
          <SaveAndCancelButtons />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotesModal;
