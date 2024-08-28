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
} from '@src/state/slice/playbackSlice';

interface AudioContextType {
  togglePlayback: (uri: string, id: number) => Promise<void>;
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
  const { isPlaying, uri } = useAppSelector(selectPlaybackInfo);
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState(0);

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setCurrentTime(0);
    }
  }, []);

  const clearPlayback = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await unloadSound();

      setCurrentTime(0);
      dispatch(stopPlayback());
    }
  }, [dispatch, unloadSound]);

  const loadSound = useCallback(async (newUri: string) => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: newUri },
      { shouldPlay: true },
      (status: AVPlaybackStatusSuccess) => handlePlaybackStatusUpdate(status),
    );

    soundRef.current = newSound;
  }, []);

  // useEffect(() => {
  //   const handlePlaybackStatusUpdate = (
  //     playbackStatus: AVPlaybackStatusSuccess,
  //   ) => {
  //     if (playbackStatus.didJustFinish) {
  //       clearPlayback();
  //     }
  //   };

  //   if (soundRef.current) {
  //     soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
  //   }

  //   return () => {
  //     soundRef.current?.setOnPlaybackStatusUpdate(null);
  //   };
  // }, [uri, soundRef.current, clearPlayback]);

  const handlePlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatusSuccess) => {
      if (playbackStatus.isLoaded) {
        const newPosition = playbackStatus.positionMillis / 1000; // Convert to seconds
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

  const seekTo = useCallback(
    async (position: number) => {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(position * 1000);
        setCurrentTime(position);
      }
    },
    [dispatch],
  );

  return (
    <AudioContext.Provider
      value={{ togglePlayback, clearPlayback, seekTo, currentTime }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioContext);
