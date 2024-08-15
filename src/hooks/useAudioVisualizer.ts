import { useEffect, useRef } from 'react';

import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/selectors/playbackSelector';
import {
  EMPTY_AUDIO_WAVE_ARRAY,
  LEADING_DOTS_ARRAY,
  MAX_AUDIO_WAVE_BARS,
} from '@src/common/constants';

interface Props {
  isRecording: boolean;
  setWave: (value: number[] | ((value: number[]) => void)) => void;
}

const useAudioWave = ({ isRecording, setWave }: Props) => {
  const isPlaying = useAppSelector(selectIsPlaying);
  const fullWaveRef = useRef<number[]>([...LEADING_DOTS_ARRAY]);
  const scrollPositionRef = useRef<number>(0);
  const fullWaveLength = fullWaveRef.current.length;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const initializeWave = () => {
      if (isRecording) {
        fullWaveRef.current = [...LEADING_DOTS_ARRAY];
        setWave([...EMPTY_AUDIO_WAVE_ARRAY]);

        scrollPositionRef.current = 0;
      } else if (!isRecording && fullWaveLength > LEADING_DOTS_ARRAY.length) {
        const visibleWave = [
          ...fullWaveRef.current.slice(0, MAX_AUDIO_WAVE_BARS),
        ];

        setWave(visibleWave);
        scrollPositionRef.current = 0;
      } else {
        setWave([...EMPTY_AUDIO_WAVE_ARRAY]);
        scrollPositionRef.current = 0;
      }
    };

    const updateVisibleWave = () => {
      const visibleWave = fullWaveRef.current.slice(
        scrollPositionRef.current,
        scrollPositionRef.current + MAX_AUDIO_WAVE_BARS,
      );

      while (visibleWave.length < MAX_AUDIO_WAVE_BARS) {
        visibleWave.push(null);
      }

      setWave(visibleWave);
    };

    const updateWave = () => {
      if (isRecording) {
        // Replace with actual audio data processing when available.
        const newHeight = Math.random() * 50 + 10; // Minimum height of 10

        fullWaveRef.current.push(newHeight);
        setWave((prevWave: number[]) => [...prevWave.slice(1), newHeight]);
      } else if (isPlaying) {
        scrollPositionRef.current =
          (scrollPositionRef.current + 1) % fullWaveLength;

        updateVisibleWave();
      }
    };

    initializeWave();

    if (isRecording || isPlaying) {
      intervalId = setInterval(updateWave, 1000 / 8);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording, isPlaying]);
};

export default useAudioWave;
