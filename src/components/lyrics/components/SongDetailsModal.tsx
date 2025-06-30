import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import CompletionStatus from '@src/components/lyrics/subcomponents/CompletionStatus';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { SongInfo } from '@src/components/common/types';
import { COMPLETED_TIP, SONG_DETAILS } from '@src/components/common/constants';
import useSongDetailsModalStyle from '@src/styles/songDetailsModal';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  updateSongArtistRequest,
  updateSongCompletionRequest,
} from '@src/state/sagas/actionCreators';
import SongDetailSelect from '@src/components/lyrics/subcomponents/SongDetailSelect';
import BpmDetail from '@src/components/lyrics/subcomponents/BpmDetail';
import { LyricsOption, SongDetailKey } from '@src/components/common/enums';
import {
  selectCurrentSongArtistId,
  selectCurrentSongCompletionStatus,
} from '@src/state/selectors/songsSelector';
import AboutArtist from '@src/components/lyrics/subcomponents/AboutArtist';
import { useColorTheme } from '@src/state/context/ThemeContext';
import useLyricsSheetGenerator from '@src/hooks/useLyricsSheetGenerator';
import StyledText from '@src/components/common/components/StyledText';
import useDebounce from '@src/hooks/useDebounce';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';

interface Props {
  isSongDetailsModalOpen: boolean;
  setIsSongDetailsModalOpen: (value: boolean) => void;
  setSelectedOption: (valuer: LyricsOption) => void;
  info: SongInfo;
  songId: number;
  setHasDetailChanges: (value: boolean) => void;
  hasDetailChanges: boolean;
}

const SongDetailsModal = (props: Props) => {
  const {
    isSongDetailsModalOpen,
    setIsSongDetailsModalOpen,
    setSelectedOption,
    info: originalInfo,
    songId,
    setHasDetailChanges,
    hasDetailChanges,
  } = props;
  const styles = useSongDetailsModalStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const completionStatus = useAppSelector(selectCurrentSongCompletionStatus);
  const currentSongArtistId = useAppSelector(selectCurrentSongArtistId);
  const { theme } = useColorTheme();
  const { updateInfo } = useLyricsSheetGenerator();

  const [newInfo, setNewInfo] = useState<SongInfo>(originalInfo);
  const [newCompletionStatus, setNewCompletionStatus] =
    useState<boolean>(completionStatus);
  const [selectedArtistId, setSelectedArtistId] = useState(currentSongArtistId);
  const [isBpmInvalid, setIsBpmInvalid] = useState(false);
  const displayTips = useAppSelector(selectDisplayTips);

  const onExitPress = () => {
    setSelectedOption(LyricsOption.NONE);
    setIsSongDetailsModalOpen(false);
  };

  const onCancelPress = () => {
    onExitPress();
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
    setHasDetailChanges(
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

  const debouncedValidateBpm = useDebounce((value: string) => {
    const bpmNum = Number(value);
    setIsBpmInvalid(value && (bpmNum < 60 || bpmNum > 180));
  }, 400);

  const handleBpmChange = (key: keyof SongInfo, value: string) => {
    setNewInfo({ ...newInfo, [key]: value });
    debouncedValidateBpm(value);
  };

  const handleInputChange = (key: keyof SongInfo, value: string | boolean) => {
    setNewInfo({ ...newInfo, [key]: value });
  };

  const handleCompletionStatusChange = () => {
    setNewCompletionStatus(!newCompletionStatus);
  };

  const onSavePress = () => {
    if (isBpmInvalid) {
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

    setSelectedOption(LyricsOption.NONE);
    setIsSongDetailsModalOpen(false);
  };

  const defaultPlaceholder = 'About';
  const placeholder = displayTips
    ? `${defaultPlaceholder}\n\n${COMPLETED_TIP}`
    : defaultPlaceholder;

  return (
    <Modal
      isVisible={isSongDetailsModalOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={styles.modal}
      hideModalContentWhileAnimating={true}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.mainInputContainer}>
          <Text style={styles.title}>Details</Text>
          <View style={styles.textbox}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
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
                    handleInputChange={handleBpmChange}
                  />
                );
              },
            )}
          </View>
        </View>
        {isBpmInvalid && (
          <StyledText style={styles.warningText}>
            *Bpm must be between 60 and 180
          </StyledText>
        )}
        <AboutArtist
          selectedArtistId={selectedArtistId}
          setSelectedArtistId={setSelectedArtistId}
        />
        <CompletionStatus
          isCompleted={newCompletionStatus}
          handleInputChange={handleCompletionStatusChange}
        />
        <View style={styles.buttonContainer}>
          <SaveAndCancelButtons
            onPress={onSavePress}
            onExitPress={onCancelPress}
            disabled={!hasDetailChanges}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SongDetailsModal;
