import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import useInfoModalStyle from '@styles/infoModal';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  page: page;
}

const InfoModal = (props: Props) => {
  const styles = useInfoModalStyle();
  const { isInfoModalOpen, setIsInfoModalOpen, page } = props;

  const [about, setAbout] = useState<string>(page.about);
  const [isCompleted, setIsCompleted] = useState(!!page.completed);

  const onExitPress = () => setIsInfoModalOpen(false);
  const disabled: boolean = !about;

  return (
    <Modal
      isVisible={isInfoModalOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.container}>
        <Text style={styles.title}>About</Text>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Add details for the song..."
            value={about}
            onChangeText={(newAbout: string) => setAbout(newAbout)}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.details}>
          {SONG_DETAILS.map(({ label, key }: songDetail) => (
            <SongDetail key={label} label={label} value={page[key]} />
          ))}
        </View>
        <CompletionStatus
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        <SaveAndCancelButtons
          onPress={() => null}
          onExitPress={() => setIsInfoModalOpen(false)}
          disabled={disabled}
        />
      </View>
    </Modal>
  );
};

export default InfoModal;
