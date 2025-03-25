import React, {
  Context,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectAudioPlayerInfo } from '@src/state/selectors/playbackSelector';
import {
  pausePlayback,
  resumePlayback,
  startPlayback,
  stopPlayback,
} from '@src/state/slice/playbackSlice';

interface AudioContextType {
  togglePlayback: (uri: string, id: number) => Promise<void>;
  clearPlayback: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  didJustFinish: boolean;
  soundRef: React.MutableRefObject<Audio.Sound | null>;
}

const AudioContext: Context<AudioContextType> = createContext(undefined);

type Props = {
  children?: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const { isPlaying, uri } = useAppSelector(selectAudioPlayerInfo);
  const dispatch = useAppDispatch();
  const [didJustFinish, setDidJustFinish] = useState(false);

  useEffect(() => {
    const setAudioMode = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });
    };
    setAudioMode();
  }, []);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const clearPlayback = useCallback(async () => {
    dispatch(stopPlayback());
    await unloadSound();
    setDidJustFinish(false);
  }, [dispatch, unloadSound]);

  const handlePlaybackStatusUpdate = useCallback(
    async (playbackStatus: AVPlaybackStatusSuccess) => {
      if (!playbackStatus.isLoaded) return;

      if (playbackStatus.didJustFinish) {
        setDidJustFinish(true);
        dispatch(stopPlayback());
        await unloadSound();
      }
    },
    [clearPlayback],
  );

  const loadSound = useCallback(
    async (newUri: string) => {
      try {
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: newUri },
          {
            shouldPlay: false,
            progressUpdateIntervalMillis: 100,
          },
          handlePlaybackStatusUpdate,
        );
        soundRef.current = sound;

        if (status.isLoaded) {
          return status.durationMillis ? status.durationMillis / 1000 : 0;
        }
        return 0;
      } catch (error) {
        console.error('Failed to load sound:', error);
        return 0;
      }
    },
    [handlePlaybackStatusUpdate],
  );

  const togglePlayback = useCallback(
    async (newUri: string, id: number) => {
      try {
        setDidJustFinish(false);

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
            if (soundRef.current) {
              await soundRef.current.playAsync();
            }
          }
        } else {
          const duration = await loadSound(newUri);
          dispatch(startPlayback({ uri: newUri, id, duration }));
          if (soundRef.current) {
            await soundRef.current.playAsync();
          }
        }
      } catch (error) {
        console.error('Error toggling playback:', error);
      }
    },
    [uri, isPlaying, clearPlayback, loadSound, dispatch],
  );

  const seekTo = useCallback(async (position: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(position * 1000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      togglePlayback,
      clearPlayback,
      seekTo,
      didJustFinish,
      soundRef,
    }),
    [togglePlayback, clearPlayback, seekTo, didJustFinish],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);

export const RecordingAudioProvider = ({
  children,
}: {
  children: ReactNode;
}) => <AudioProvider>{children}</AudioProvider>;

export const SongTakesAudioProvider = ({
  children,
}: {
  children: ReactNode;
}) => <AudioProvider>{children}</AudioProvider>;

export const HomeSongsAudioProvider = ({
  children,
}: {
  children: ReactNode;
}) => <AudioProvider>{children}</AudioProvider>;
