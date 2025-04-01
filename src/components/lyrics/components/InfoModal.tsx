import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';
import { useHeaderHeight } from '@react-navigation/elements';

import CompletionStatus from '@src/components/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { SongInfo } from '@src/components/common/types';
import { SONG_DETAILS } from '@src/components/common/constants';
import useInfoModalStyle from '@src/styles/infoModal';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  updateSongArtistRequest,
  updateSongCompletionRequest,
} from '@src/state/sagas/actionCreators';
import SongDetailSelect from '@src/components/lyrics/subcomponents/SongDetailSelect';
import BpmDetail from '@src/components/lyrics/subcomponents/BpmDetail';
import { SongDetailKey } from '@src/components/common/enums';
import {
  selectCurrentSongArtistId,
  selectCurrentSongCompletionStatus,
} from '@src/state/selectors/songsSelector';
import AboutArtist from '@src/components/lyrics/subcomponents/AboutArtist';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useLyricsSheetGenerator from '@src/hooks/useLyricsSheetGenerator';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  useKeyboardController,
} from 'react-native-keyboard-controller';

interface Props {
  isInfoModalOpen: boolean;
  setIsInfoModalOpen: (value: boolean) => void;
  info: SongInfo;
  songId: number;
  headerHeight: number;
}

const InfoModal = (props: Props) => {
  const {
    isInfoModalOpen,
    setIsInfoModalOpen,
    info: originalInfo,
    songId,
    headerHeight,
  } = props;
  const styles = useInfoModalStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const completionStatus = useAppSelector(selectCurrentSongCompletionStatus);
  const currentSongArtistId = useAppSelector(selectCurrentSongArtistId);
  const { theme } = useColorTheme();
  const { updateInfo } = useLyricsSheetGenerator();

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

    if (
      Object.keys(changedInfo).length > 0 ||
      selectedArtistId !== currentSongArtistId
    ) {
      updateInfo(changedInfo, selectedArtistId);
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

  // const { setEnabled } = useKeyboardController();

  // setEnabled(false);
  // const headerHeight = useHeaderHeight();
  const statusBarHeight =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : Platform.OS === 'ios'
        ? 44
        : 20;

  console.log('headerHeight:', headerHeight);

  return (
    // <KeyboardAwareScrollView
    // // keyboardVerticalOffset={headerHeight - statusBarHeight}
    // >
    <Modal
      isVisible={isInfoModalOpen}
      avoidKeyboard={false}
      onBackdropPress={onExitPress}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight + statusBarHeight + 10}
        behavior="padding"
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>About</Text>
            <View style={styles.textbox}>
              <TextInput
                style={styles.input}
                placeholder="Add details for the song..."
                placeholderTextColor={theme.placeholderText}
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
              headerHeight={headerHeight}
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InfoModal;
