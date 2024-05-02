import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { info, songDetail, test } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import useInfoModalStyle from '@styles/infoModal';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
}

const InfoModal = (props: Props) => {
  const route: RouteProp<test> = useRoute<RouteProp<test>>();
  const info: info = route.params.song.page.info;
  const styles = useInfoModalStyle();

  const { isInfoModalOpen, setIsInfoModalOpen } = props;
  const [about, setAbout] = useState<string>(info.about);
  const [isCompleted, setIsCompleted] = useState(info.completed);

  const onExitPress = () => setIsInfoModalOpen(false);
  const disabled: boolean = !about;

  return (
    <Modal transparent visible={isInfoModalOpen}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
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
              <SongDetail key={label} label={label} value={info[key]} />
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
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoModal;
