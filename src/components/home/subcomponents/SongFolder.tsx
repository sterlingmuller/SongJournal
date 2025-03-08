import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import StyledText from '@src/components/common/components/StyledText';
import ShareIcon from '@src/icons/ShareIcon';
import PlayIcon from '@src/icons/PlayIcon';
import PlaybackBar from '@src/components/home/subcomponents/PlaybackBar';
import { RootStackParamList, Song, Take } from '@src/components/common/types';
import useSongFolderStyles from '@src/styles/songFolder';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { setCurrentSongId } from '@src/state/slice/currentSongSlice';
import PauseIcon from '@src/icons/PauseIcon';
import {
  selectIsPlaying,
  selectPlayingId,
} from '@src/state/selectors/playbackSelector';
import { fetchPageRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import useDoubleTap from '@src/hooks/useDoubleTap';
import { TextInput } from 'react-native-gesture-handler';
import { formatDateFromISOString } from '@src/utils/formateDateFromISOString';
import useFileShare from '@src/hooks/useFileShare';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import PageIcon from '@src/icons/PageIcon';
import { Screen } from '@src/components/common/enums';
import formatDuration from '@src/utils/formatDuration';

interface Props {
  song: Song;
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    artistId?: number;
    hasLyrics?: boolean;
  }) => void;
}

const SongFolder = ({ song, setTitleToEdit }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useSongFolderStyles();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { shareSongFolder } = useFileShare();
  const { togglePlayback, clearPlayback } = useAudioPlayer();

  const { title, songId, takes, selectedTakeId, artistId, hasLyrics } = song;
  const [isPressed, setIsPressed] = useState(false);

  const inputRef = useRef<TextInput | null>(null);

  const selectedPlayingSongId = useAppSelector(selectPlayingId);
  const isPlaying = useAppSelector(selectIsPlaying);

  const isCurrentSongPlaying = songId === selectedPlayingSongId && isPlaying;

  const selectedTake = useMemo(
    () => takes.find((take: Take) => take.takeId === selectedTakeId),
    [takes, selectedTakeId],
  );

  const durationText = useMemo(
    () =>
      selectedTake?.uri
        ? formatDuration(selectedTake.duration)
        : 'No recordings exist for this song',
    [selectedTake?.duration, selectedTake?.uri],
  );

  const handleShare = useCallback(() => {
    shareSongFolder(song);
  }, [shareSongFolder, song]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  const handleOnPressNavigation = useCallback(
    (screen: Screen.SONG | Screen.LYRICS) => {
      dispatch(setCurrentSongId(songId));
      clearPlayback();

      if (screen === Screen.LYRICS) {
        dispatch(fetchPageRequest({ songId, db }));
        navigate(screen, { previousScreen: Screen.HOME });
      } else navigate(screen);
    },
    [dispatch, songId, db, navigate],
  );

  const onTogglePlayback = useCallback(() => {
    if (selectedTake) {
      togglePlayback(selectedTake.uri, songId);
    }
  }, [selectedTake, togglePlayback, songId]);

  const onDoubleTap: () => void = useDoubleTap(() => {
    setTitleToEdit({ songTitle: title, songId: songId, artistId, hasLyrics });
    setTimeout(() => inputRef.current?.focus(), 100);
  });

  const renderTitle = () => {
    if (song.orderNumber) {
      return `${song.orderNumber}. ${title}`;
    }
    return title;
  };

  return (
    <TouchableOpacity
      style={[styles.rowContainer, isPressed && styles.rowPressed]}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => handleOnPressNavigation(Screen.SONG)}
    >
      <View style={styles.contents}>
        <TouchableOpacity
          onPress={onDoubleTap}
          testID="Song_Folder-Title"
          style={styles.titleContainer}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <StyledText style={styles.title}>{renderTitle()}</StyledText>
        </TouchableOpacity>
        <View style={styles.subtextContainer}>
          <StyledText style={styles.trackSubtext}>
            {formatDateFromISOString(song.creationDate)}
          </StyledText>
          <StyledText style={styles.trackSubtext}>{durationText}</StyledText>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => handleOnPressNavigation(Screen.LYRICS)}
            style={{ paddingBottom: 4 }}
            hitSlop={{ top: 10, bottom: 20, left: 10, right: 10 }}
          >
            <PageIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            hitSlop={{ top: 10, bottom: 20, left: 10, right: 10 }}
          >
            <ShareIcon />
          </TouchableOpacity>
          {selectedTake &&
            (selectedPlayingSongId === songId ? (
              <PlaybackBar
                duration={selectedTake ? selectedTake.duration : 0}
              />
            ) : (
              <View style={styles.staticPlaybackBar} />
            ))}
        </View>
      </View>
      {selectedTake && (
        <TouchableOpacity
          style={styles.playIcon}
          onPress={onTogglePlayback}
          hitSlop={{ top: 30, bottom: 10, left: 20, right: 30 }}
        >
          {isCurrentSongPlaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(SongFolder);
