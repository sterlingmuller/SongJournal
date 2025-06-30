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
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import {
  AUDIO_UPDATE_INTERVAL,
  MAX_BARS,
  SILENCE_THRESHOLD,
} from '@src/components/common/constants';
import { scaleDbToHeight } from '@src/utils/scaleDbToHeight';

interface RecordingContextType {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<{ uri: string | null; duration: number }>;
  clearRecording: () => Promise<void>;

  isRecording: boolean;
  duration: number;
  displayWaveShared: SharedValue<number[]>;
  fullWaveRef: React.RefObject<number[]>;
  recordingRef: React.RefObject<Audio.Recording | null>;
}

const RecordingContext: Context<RecordingContextType> =
  createContext(undefined);

type Props = {
  children?: ReactNode;
};

export const RecordingProvider = ({ children }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState<number | null>(0);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const fullWaveRef = useRef<number[]>([]);
  const displayWaveShared = useSharedValue<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const levelSum = useRef(0);
  const levelCount = useRef(0);
  let audioWaveIntervalId: NodeJS.Timeout;

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

  useEffect(() => {
    console.log('is recording', isRecording);
    if (isRecording) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }

    return () => {
      deactivateKeepAwake();
    };
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    try {
      const { status } = await Audio.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Audio.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          throw new Error('Microphone permission not granted');
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });

      fullWaveRef.current = [];
      displayWaveShared.set([]);

      levelSum.current = 0;
      levelCount.current = 0;

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        ({ metering }: RecordingStatus) => {
          if (metering > SILENCE_THRESHOLD) {
            const normalizedLevel = (metering + 160) / 160;
            const scaledLevel = Math.log10(normalizedLevel * 9 + 1) * 100;

            levelSum.current += scaledLevel;
            levelCount.current++;
          }
        },
        50,
      );

      audioWaveIntervalId = setInterval(() => {
        if (levelCount.current > 0) {
          const averageLevel = levelSum.current / levelCount.current;
          const scaledHeight = scaleDbToHeight(averageLevel);

          fullWaveRef.current.push(scaledHeight);
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

    const { durationMillis } = await recordingRef.current.getStatusAsync();

    await recordingRef.current.stopAndUnloadAsync();
    clearInterval(audioWaveIntervalId);

    const finalDurationSec = Math.floor(durationMillis / 1000);
    const uri = recordingRef.current.getURI();

    setDuration(finalDurationSec);
    setIsRecording(false);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });

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
    setDuration(null);
    setIsRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });
  }, [isRecording]);

  return (
    <RecordingContext.Provider
      value={{
        isRecording,
        startRecording,
        stopRecording,
        clearRecording,
        duration,
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
