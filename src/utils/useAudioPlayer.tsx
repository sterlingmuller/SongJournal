import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const onPlaybackStatusUpdate = (
      playbackStatus: AVPlaybackStatusSuccess,
    ) => {
      console.log('status:', playbackStatus);
      if (playbackStatus.didJustFinish) {
        console.log('meep');
        soundRef.current.unloadAsync();
        dispatch(stopPlayback());
      }
    };

    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    return () => {
      soundRef.current?.setOnPlaybackStatusUpdate(null);
    };
  }, [uri, soundRef.current]);

  const togglePlayback = async (newUri: string, takeId: number) => {
    if (soundRef.current) {
      if (uri === newUri) {
        if (isPlaying) {
          soundRef.current.pauseAsync().then(() => dispatch(pausePlayback()));
        } else {
          soundRef.current.playAsync().then(() => dispatch(resumePlayback()));
        }
      } else {
        // soundRef.current.stopAsync();
        soundRef.current.unloadAsync().then(() => (soundRef.current = null));
        dispatch(stopPlayback());

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: newUri },
          { shouldPlay: true },
        );

        dispatch(startPlayback({ uri: newUri, takeId }));

        soundRef.current = newSound;

        // newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
    } else {
      const { sound } = await Audio.Sound.createAsync(
        { uri: newUri },
        // { shouldPlay: true, progressUpdateIntervalMillis: 100 },
      );
      soundRef.current = sound;

      soundRef.current
        .playAsync()
        .then(() => dispatch(startPlayback({ uri: newUri, takeId })));

      // dispatch(startPlayback({ uri: newUri, id: newId }));
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
