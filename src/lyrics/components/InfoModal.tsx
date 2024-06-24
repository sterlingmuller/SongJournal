import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import CompletionStatus from '@src/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import useInfoModalStyle from '@styles/infoModal';
import { useAppDispatch } from '@src/common/hooks';
import { updatePageInfoRequest } from '@src/sagas/actionCreators';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  page: page;
  songId: number;
}

const InfoModal = (props: Props) => {
  const styles = useInfoModalStyle();
  const dispatch = useAppDispatch();
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    page: originalPage,
    songId,
  } = props;

  const [newPage, setNewPage] = useState<page>(originalPage);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const onExitPress = () => setIsInfoModalOpen(false);

  console.log('newPage', newPage);
  console.log('originalPage', originalPage);

  useEffect(() => {
    console.log(
      'save test:',
      JSON.stringify(newPage) !== JSON.stringify(originalPage),
    );
    setIsSaveButtonEnabled(
      JSON.stringify(newPage) !== JSON.stringify(originalPage),
    );
  }, [newPage, originalPage]);

  const handleInputChange = (key: keyof page, value: string | boolean) => {
    setNewPage((prevPage: page) => ({ ...prevPage, [key]: value }));
  };

  const onSavePress = () => {
    if (isSaveButtonEnabled && newPage) {
      // giving me issues here
      dispatch(
        updatePageInfoRequest({
          songId,
          page: newPage,
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
            value={newPage.about}
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
              key={label}
              label={label}
              value={newPage[key]}
              handleInputChange={handleInputChange}
            />
          ))}
        </View>
        <CompletionStatus
          isCompleted={newPage.completed}
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
