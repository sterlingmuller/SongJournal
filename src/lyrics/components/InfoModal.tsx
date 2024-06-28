import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { SongInfo, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import useInfoModalStyle from '@styles/infoModal';
import { useAppDispatch } from '@src/common/hooks';
import { updatePageInfoRequest } from '@src/sagas/actionCreators';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  info: SongInfo;
  songId: number;
}

const InfoModal = (props: Props) => {
  const styles = useInfoModalStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    info: originalInfo,
    songId,
  } = props;

  const [newInfo, setNewInfo] = useState<SongInfo>(originalInfo);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const onExitPress = () => setIsInfoModalOpen(false);

  useEffect(() => {
    setIsSaveButtonEnabled(
      JSON.stringify(newInfo) !== JSON.stringify(originalInfo),
    );
  }, [newInfo, originalInfo]);

  const handleInputChange = (key: keyof SongInfo, value: string | boolean) => {
    console.log('info:', newInfo);
    setNewInfo({ ...newInfo, [key]: value });
    console.log('new info:', newInfo);
  };

  const onSavePress = () => {
    if (isSaveButtonEnabled && newInfo) {
      dispatch(
        updatePageInfoRequest({
          songId,
          info: newInfo,
          db,
        }),
      );
    }

    setIsInfoModalOpen(false);
  };

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
            value={newInfo.about}
            onChangeText={(newAbout: string) =>
              handleInputChange('about', newAbout)
            }
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.details}>
          {SONG_DETAILS.map(({ label, key }: songDetail) => (
            <SongDetail
              key={key}
              detailKey={key}
              label={label}
              value={newInfo[key]}
              handleInputChange={handleInputChange}
            />
          ))}
        </View>
        <CompletionStatus
          isCompleted={newInfo.completed}
          handleInputChange={handleInputChange}
        />
        <SaveAndCancelButtons
          onPress={onSavePress}
          onExitPress={() => setIsInfoModalOpen(false)}
          disabled={!isSaveButtonEnabled}
        />
      </View>
    </Modal>
  );
};

export default InfoModal;
