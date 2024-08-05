import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { SongInfo, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import useInfoModalStyle from '@styles/infoModal';
import { useAppDispatch } from '@src/common/hooks';
import { updatePageInfoRequest } from '@src/sagas/actionCreators';
import SongDetailSelect from '@src/lyrics/subcomponents/SongDetailSelect';
import BpmDetail from '@src/lyrics/subcomponents/BpmDetail';

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
  const bpmNum = Number(newInfo.bpm);

  const onExitPress = () => setIsInfoModalOpen(false);

  useEffect(() => {
    setIsSaveButtonEnabled(
      JSON.stringify(newInfo) !== JSON.stringify(originalInfo),
    );
  }, [newInfo, originalInfo]);

  const handleInputChange = (key: keyof SongInfo, value: string | boolean) => {
    setNewInfo({ ...newInfo, [key]: value });
  };

  const onSavePress = () => {
    if (newInfo.bpm && (bpmNum < 60 || bpmNum > 180)) {
      setNewInfo({ ...newInfo, bpm: '' });
      return;
    }
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
          {SONG_DETAILS.map(({ label, key }: songDetail) => {
            if (key === 'keySignature' || key === 'time') {
              return (
                <SongDetailSelect
                  key={key}
                  detailKey={key}
                  label={label}
                  value={newInfo[key]}
                  handleInputChange={handleInputChange}
                />
              );
            }
            return (
              <BpmDetail
                key={key}
                detailKey={key}
                label={label}
                value={newInfo[key]}
                handleInputChange={handleInputChange}
              />
            );
          })}
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
