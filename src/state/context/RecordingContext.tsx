import React, {
  Context,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Audio } from 'expo-av';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { RecordingStatus } from 'expo-av/build/Audio';

import {
  AUDIO_UPDATE_INTERVAL,
  MAX_BARS,
  SILENCE_THRESHOLD,
} from '@src/components/common/constants';

interface RecordingContextType {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<{ uri: string | null; duration: number }>;
  clearRecording: () => Promise<void>;

  isRecording: boolean;
  duration: number;
  recordingDurationShared: SharedValue<number>;
  displayWaveShared: SharedValue<number[]>;
  fullWaveRef: React.MutableRefObject<number[]>;
  recordingRef: React.MutableRefObject<Audio.Recording | null>;
}

const RecordingContext: Context<RecordingContextType> =
  createContext(undefined);

type Props = {
  children?: ReactNode;
};

export const RecordingProvider = ({ children }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [finalDuration, setFinalDuration] = useState<number | null>(null);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const fullWaveRef = useRef<number[]>([]);
  const displayWaveShared = useSharedValue<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const levelSum = useRef(0);
  const levelCount = useRef(0);
  let audioWaveIntervalId: NodeJS.Timeout;

  const recordingDurationShared = useSharedValue(0);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await Audio.requestPermissionsAsync();

      fullWaveRef.current = [];
      displayWaveShared.set([]);

      recordingDurationShared.set(0);
      setFinalDuration(null);

      levelSum.current = 0;
      levelCount.current = 0;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        recordingDurationShared.value += 1;
      }, 1000);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        ({ metering }: RecordingStatus) => {
          if (metering > SILENCE_THRESHOLD) {
            const normalizedLevel = (metering + 160) / 160;
            const scaledLevel = normalizedLevel * 100;

            levelSum.current += scaledLevel;
            levelCount.current++;
          }
        },
        50,
      );

      audioWaveIntervalId = setInterval(() => {
        if (levelCount.current > 0) {
          const averageLevel = Math.round(
            levelSum.current / levelCount.current,
          );

          fullWaveRef.current.push(averageLevel);
          displayWaveShared.set(fullWaveRef.current.slice(-MAX_BARS));

          levelSum.current = 0;
          levelCount.current = 0;
        }
      }, AUDIO_UPDATE_INTERVAL);

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    await recordingRef.current.stopAndUnloadAsync();
    clearInterval(audioWaveIntervalId);

    const { durationMillis } = await recordingRef.current.getStatusAsync();

    const uri = recordingRef.current.getURI();
    const finalDurationSec = Math.floor(durationMillis / 1000);

    setFinalDuration(finalDurationSec);
    setIsRecording(false);

    return { uri, duration: finalDurationSec };
  }, []);

  const clearRecording = useCallback(async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (recordingRef.current) {
      if (isRecording) {
        await recordingRef.current.stopAndUnloadAsync();
        clearInterval(audioWaveIntervalId);
      }
      recordingRef.current = null;
    }

    fullWaveRef.current = [];
    displayWaveShared.set([]);
    recordingDurationShared.set(null);
    setFinalDuration(null);
    setIsRecording(false);
  }, [isRecording]);

  return (
    <RecordingContext.Provider
      value={{
        isRecording,
        startRecording,
        stopRecording,
        clearRecording,
        duration: finalDuration,
        recordingDurationShared,
        displayWaveShared,
        fullWaveRef,
        recordingRef,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecording = () => useContext(RecordingContext);
