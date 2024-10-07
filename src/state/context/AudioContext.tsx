import React, {
  Context,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { selectPlaybackInfo } from '@src/state/selectors/playbackSelector';
import {
  pausePlayback,
  resumePlayback,
  startPlayback,
  stopPlayback,
  updatePlaybackTime,
  updatePlaybackDuration,
} from '@src/state/slice/playbackSlice';

interface AudioContextType {
  togglePlayback: (
    uri: string,
    id: number,
    storedDuration?: number,
  ) => Promise<void>;
  clearPlayback: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  currentTime: number;
}

const AudioContext: Context<AudioContextType> = createContext(undefined);

type Props = {
  children?: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const { isPlaying, uri, playbackTime } = useAppSelector(selectPlaybackInfo);
  const dispatch = useAppDispatch();
  const [currentTime, setCurrentTime] = useState(0);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const clearPlayback = useCallback(async () => {
    if (soundRef.current) {
      await unloadSound();
      dispatch(stopPlayback());
      setCurrentTime(0);
    }
  }, [dispatch, unloadSound]);

  const loadSound = useCallback(
    async (newUri: string, storedDuration?: number) => {
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: newUri },
        { shouldPlay: false },
        handlePlaybackStatusUpdate,
      );

      soundRef.current = newSound;
      if (status.isLoaded) {
        const audioDuration = storedDuration || status.durationMillis / 1000;
        dispatch(updatePlaybackDuration(audioDuration));
        return audioDuration;
      }
      return 0;
    },
    [dispatch],
  );

  const handlePlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatusSuccess) => {
      if (playbackStatus.isLoaded) {
        const newPosition = playbackStatus.positionMillis / 1000;
        dispatch(updatePlaybackTime(newPosition));
        setCurrentTime(newPosition);

        if (playbackStatus.didJustFinish) {
          clearPlayback();
        }
      }
    },
    [dispatch, clearPlayback],
  );

  useEffect(() => {
    return () => {
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    };
  }, []);

  const togglePlayback = useCallback(
    async (newUri: string, id: number, storedDuration?: number) => {
      if (soundRef.current) {
        if (uri === newUri) {
          if (isPlaying) {
            await soundRef.current.pauseAsync();
            dispatch(pausePlayback());
          } else {
            await soundRef.current.playAsync();
            dispatch(resumePlayback());
          }
        } else {
          await clearPlayback();
          const duration = await loadSound(newUri, storedDuration);
          dispatch(startPlayback({ uri: newUri, id, duration }));
          await soundRef.current.playAsync();
        }
      } else {
        const duration = await loadSound(newUri, storedDuration);
        dispatch(startPlayback({ uri: newUri, id, duration }));
        await soundRef.current.playAsync();
      }
    },
    [uri, isPlaying, clearPlayback, loadSound, dispatch],
  );

  const seekTo = useCallback(
    async (position: number) => {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(position * 1000);
        dispatch(updatePlaybackTime(position));
        setCurrentTime(position);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    setCurrentTime(playbackTime);
  }, [playbackTime]);

  return (
    <AudioContext.Provider
      value={{ togglePlayback, clearPlayback, seekTo, currentTime }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);
