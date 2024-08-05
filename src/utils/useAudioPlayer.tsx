import { useEffect, useRef, useCallback } from 'react';
import { AVPlaybackStatusSuccess, Audio } from 'expo-av';
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { selectPlaybackInfo } from '@src/selectors/playbackSelector';
import {
  pausePlayback,
  resumePlayback,
  startPlayback,
  stopPlayback,
} from '@src/slice/playbackSlice';

const useAudioPlayer = () => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const { isPlaying, uri } = useAppSelector(selectPlaybackInfo);
  const dispatch = useAppDispatch();

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const stop = useCallback(async () => {
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
        stop();
      }
    };

    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    };
  }, [uri, soundRef.current, stop]);

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
          await stop();
          await loadSound(newUri);
          dispatch(startPlayback({ uri: newUri, id }));
        }
      } else {
        await loadSound(newUri);
        dispatch(startPlayback({ uri: newUri, id }));
      }
    },
    [uri, isPlaying, stop, loadSound, dispatch],
  );

  return { stop, togglePlayback };
};

export default useAudioPlayer;
