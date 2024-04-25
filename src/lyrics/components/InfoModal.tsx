import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import infoModalStyle from '@styles/infoModal';
import { RootStackParamList } from '@src/common/types';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
}

const InfoModal = ({ isInfoModalOpen, setIsInfoModalOpen }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [about, setAbout] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const onExitPress = () => setIsInfoModalOpen(false);

  return (
    <Modal transparent visible={isInfoModalOpen}>
      <TouchableOpacity
        style={infoModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={infoModalStyle.container}>
          <Text style={infoModalStyle.title}>About</Text>
          <View style={infoModalStyle.textbox}>
            <TextInput
              style={infoModalStyle.input}
              placeholder="Add details for the song..."
              value={about}
              onChangeText={(newAbout: string) => setAbout(newAbout)}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={infoModalStyle.details}>
            <SongDetail label={'Key'} />
            <SongDetail label={'Time'} />
            <SongDetail label={'Bpm'} />
          </View>
          <CompletionStatus
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
          <SaveAndCancelButtons />
          {/* <View style={infoModalStyle.buttons}>
            <View style={infoModalStyle.button}>
              <Button title="Save" color="#81C2F1" onPress={() => navigate('CurrentSongFolder')} />
            </View>
            <View style={infoModalStyle.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoModal;
