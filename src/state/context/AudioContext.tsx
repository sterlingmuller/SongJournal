import React, {
  Context,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { EventEmitter } from 'events';

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
  updatePlaybackDuration,
} from '@src/state/slice/playbackSlice';

interface AudioContextType {
  togglePlayback: (uri: string, id: number) => Promise<void>;
  clearPlayback: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  subscribeToPlaybackStatus: (
    callback: (position: number) => void,
  ) => () => void;
  currentTime: SharedValue<number>;
}

const AudioContext: Context<AudioContextType> = createContext(undefined);

type Props = {
  children?: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const statusEmitter = useRef(new EventEmitter());
  const { isPlaying, uri } = useAppSelector(selectPlaybackInfo);
  const dispatch = useAppDispatch();
  const currentTime = useSharedValue(0);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const clearPlayback = useCallback(async () => {
    if (soundRef.current) {
      statusEmitter.current.emit('playbackStatus', 0);
      statusEmitter.current.removeAllListeners('playbackStatus');
      currentTime.value = 0;

      dispatch(stopPlayback());
      await unloadSound();
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
        statusEmitter.current.emit('playbackStatus', newPosition);
        currentTime.value = newPosition;

        if (playbackStatus.didJustFinish) {
          clearPlayback();
        }
      }
    },
    [dispatch, clearPlayback],
  );

  const subscribeToPlaybackStatus = useCallback(
    (callback: (position: number) => void) => {
      statusEmitter.current.on('playbackStatus', callback);
      return () => {
        statusEmitter.current.off('playbackStatus', callback);
      };
    },
    [],
  );

  useEffect(() => {
    return () => {
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    };
  }, []);

  console.log('audio context ');

  const togglePlayback = useCallback(
    async (newUri: string, id: number) => {
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
          const duration = await loadSound(newUri);
          dispatch(startPlayback({ uri: newUri, id, duration }));
          await soundRef.current.playAsync();
        }
      } else {
        const duration = await loadSound(newUri);
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
        currentTime.value = position;
      }
    },
    [dispatch],
  );

  return (
    <AudioContext.Provider
      value={{
        togglePlayback,
        clearPlayback,
        seekTo,
        subscribeToPlaybackStatus,
        currentTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);
