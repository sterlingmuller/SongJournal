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
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { selectPlaybackInfo } from '@src/selectors/playbackSelector';
import {
  pausePlayback,
  resumePlayback,
  startPlayback,
  stopPlayback,
} from '@src/slice/playbackSlice';

interface AudioContextType {
  togglePlayback: (uri: string, id: number) => Promise<void>;
  clearPlayback: () => Promise<void>;
}

const AudioContext: Context<AudioContextType> = createContext(undefined);

type Props = {
  children?: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const { isPlaying, uri } = useAppSelector(selectPlaybackInfo);
  const dispatch = useAppDispatch();

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const clearPlayback = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await unloadSound();

      dispatch(stopPlayback());
    }
  }, [dispatch, unloadSound]);

  const loadSound = useCallback(async (newUri: string) => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: newUri },
      { shouldPlay: true },
    );
    // { shouldPlay: true, progressUpdateIntervalMillis: 100 },

    soundRef.current = newSound;
  }, []);

  useEffect(() => {
    const handlePlaybackStatusUpdate = (
      playbackStatus: AVPlaybackStatusSuccess,
    ) => {
      if (playbackStatus.didJustFinish) {
        clearPlayback();
      }
    };

    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    };
  }, [uri, soundRef.current, clearPlayback]);

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
          await loadSound(newUri);
          dispatch(startPlayback({ uri: newUri, id }));
        }
      } else {
        await loadSound(newUri);
        dispatch(startPlayback({ uri: newUri, id }));
      }
    },
    [uri, isPlaying, clearPlayback, loadSound, dispatch],
  );

  return (
    <AudioContext.Provider value={{ togglePlayback, clearPlayback }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);
