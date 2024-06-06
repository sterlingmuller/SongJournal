import { useRef } from 'react';
import { Audio } from 'expo-av';
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

  const togglePlayback = async (newUri: string, newId: number) => {
    if (soundRef.current) {
      if (uri === newUri) {
        if (isPlaying) {
          soundRef.current.pauseAsync();
          dispatch(pausePlayback());
        } else {
          soundRef.current.playAsync();
          dispatch(resumePlayback());
        }
      } else {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        dispatch(stopPlayback());

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: newUri },
          { shouldPlay: true },
        );

        dispatch(startPlayback({ uri: newUri, id: newId }));

        soundRef.current = newSound;
      }
    } else {
      const { sound } = await Audio.Sound.createAsync(
        { uri: newUri },
        { shouldPlay: true },
      );
      soundRef.current = sound;
      dispatch(startPlayback({ uri: newUri, id: newId }));
    }
  };

  const stop = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;

      dispatch(stopPlayback());
    }
  };

  return { stop, togglePlayback };
};

export default useAudioPlayer;
