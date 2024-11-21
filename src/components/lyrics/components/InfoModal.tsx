import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import CompletionStatus from '@src/components/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { SongInfo } from '@src/components/common/types';
import { SONG_DETAILS } from '@src/components/common/constants';
import useInfoModalStyle from '@src/styles/infoModal';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import {
  updateSongArtistRequest,
  updateSongCompletionRequest,
  UpdatePageInfoRequest,
} from '@src/state/sagas/actionCreators';
import SongDetailSelect from '@src/components/lyrics/subcomponents/SongDetailSelect';
import BpmDetail from '@src/components/lyrics/subcomponents/BpmDetail';
import { SongDetailKey } from '@src/components/common/enums';
import {
  selectCurrentSongArtistId,
  selectCurrentSongCompletionStatus,
} from '@src/state/selectors/songsSelector';
import AboutArtist from '../subcomponents/AboutArtist';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  info: SongInfo;
  songId: number;
}

const InfoModal = (props: Props) => {
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    info: originalInfo,
    songId,
  } = props;
  const styles = useInfoModalStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const completionStatus = useAppSelector(selectCurrentSongCompletionStatus);
  const currentSongArtistId = useAppSelector(selectCurrentSongArtistId);
  const { theme } = useColorTheme();

  const [newInfo, setNewInfo] = useState<SongInfo>(originalInfo);
  const [newCompletionStatus, setNewCompletionStatus] =
    useState<boolean>(completionStatus);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(currentSongArtistId);

  const bpmNum = Number(newInfo.bpm);

  const onExitPress = () => {
    setIsInfoModalOpen(false);
    setNewInfo(originalInfo);
  };

  const changedInfo = useMemo(() => {
    return Object.entries(newInfo).reduce(
      (acc: Partial<SongInfo>, [key, value]: [string, string | undefined]) => {
        if (value !== originalInfo[key as keyof SongInfo]) {
          acc[key as keyof SongInfo] = value;
        }
        return acc;
      },
      {} as Partial<SongInfo>,
    );
  }, [newInfo, originalInfo]);

  useEffect(() => {
    setIsSaveButtonEnabled(
      Object.keys(changedInfo).length > 0 ||
        newCompletionStatus !== completionStatus ||
        selectedArtistId !== currentSongArtistId,
    );
  }, [
    newInfo,
    originalInfo,
    newCompletionStatus,
    completionStatus,
    selectedArtistId,
    currentSongArtistId,
  ]);

  const handleInputChange = (key: keyof SongInfo, value: string | boolean) => {
    setNewInfo({ ...newInfo, [key]: value });
  };

  const handleCompletionStatusChange = () => {
    setNewCompletionStatus(!newCompletionStatus);
  };

  const onSavePress = () => {
    if (newInfo.bpm && (bpmNum < 60 || bpmNum > 180)) {
      setNewInfo({ ...newInfo, bpm: originalInfo.bpm });
      return;
    }

    if (Object.keys(changedInfo).length > 0) {
      dispatch(UpdatePageInfoRequest({ songId, db, info: changedInfo }));
    }

    if (newCompletionStatus !== completionStatus) {
      dispatch(
        updateSongCompletionRequest({
          songId,
          db,
          completed: newCompletionStatus,
        }),
      );
    }

    if (selectedArtistId !== currentSongArtistId) {
      dispatch(
        updateSongArtistRequest({ songId, artistId: selectedArtistId, db }),
      );
    }

    setIsInfoModalOpen(false);
  };

  return (
    <Modal
      isVisible={isInfoModalOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={styles.modal}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>About</Text>
          <View style={styles.textbox}>
            <TextInput
              style={styles.input}
              placeholder="Add details for the song..."
              placeholderTextColor={theme.secondaryText}
              value={newInfo.about}
              onChangeText={(newAbout: string) =>
                handleInputChange('about', newAbout)
              }
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.details}>
            {Object.entries(SONG_DETAILS).map(
              ([key, label]: [SongDetailKey, string]) => {
                if (
                  key === SongDetailKey.KEY_SIGNATURE ||
                  key === SongDetailKey.TIME
                ) {
                  return (
                    <SongDetailSelect
                      key={key}
                      label={label}
                      value={newInfo[key]}
                      handleInputChange={handleInputChange}
                    />
                  );
                }
                return (
                  <BpmDetail
                    key={key}
                    value={newInfo[key]}
                    handleInputChange={handleInputChange}
                  />
                );
              },
            )}
          </View>
          <AboutArtist
            selectedArtistId={selectedArtistId}
            setSelectedArtistId={setSelectedArtistId}
          />
          <CompletionStatus
            isCompleted={newCompletionStatus}
            handleInputChange={handleCompletionStatusChange}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={onExitPress}
            disabled={!isSaveButtonEnabled}
          />
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
