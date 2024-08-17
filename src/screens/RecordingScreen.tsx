import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';
import {
  AUDIO_UPDATE_INTERVAL,
  EMPTY_AUDIO_WAVE_ARRAY,
  LEADING_DOTS_ARRAY,
  MAX_AUDIO_WAVE_BARS,
} from '@src/components/common/constants';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';

const RecordingScreen = () => {
  const styles = useRecordingStyles();

  const [uri, setUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  // maybe move recording to controls, might need it in audiowave
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [visibleWave, setVisibleWave] = useState<number[]>([
    ...EMPTY_AUDIO_WAVE_ARRAY,
  ]);

  // const fullWaveRef = useRef<number[]>([...LEADING_DOTS_ARRAY]);
  const [fullWave, setFullWave] = useState<number[]>([...LEADING_DOTS_ARRAY]);
  const scrollPositionRef = useRef<number>(0);

  const isPlaying = useAppSelector(selectIsPlaying);
  // const fullWaveLength = fullWave.length - LEADING_DOTS_ARRAY.length;
  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!isRecording && duration) {
      setVisibleWave([...fullWave.slice(0, MAX_AUDIO_WAVE_BARS)]);
    } else if (!isRecording && !duration) {
      setVisibleWave([...EMPTY_AUDIO_WAVE_ARRAY]);
    }
  }, [isRecording, duration, isPlaying]);

  const updatePlaybackWavePosition = () => {
    const newPos = scrollPositionRef.current + 1;
    scrollPositionRef.current = newPos;

    const visibleWave = fullWave.slice(
      scrollPositionRef.current,
      scrollPositionRef.current + MAX_AUDIO_WAVE_BARS,
    );

    while (visibleWave.length < MAX_AUDIO_WAVE_BARS) {
      visibleWave.push(null);
    }

    setVisibleWave(visibleWave);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(
        updatePlaybackWavePosition,
        AUDIO_UPDATE_INTERVAL,
      );
    }

    return () => {
      if (intervalId) {
        scrollPositionRef.current = 0;
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <AudioWaveDisplay
        isRecording={isRecording}
        wave={visibleWave}
        setWave={setVisibleWave}
      />
      <Timer duration={duration} />
      <RecordingControls
        duration={duration}
        setDuration={setDuration}
        uri={uri}
        setUri={setUri}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        recording={recording}
        setRecording={setRecording}
        setWave={setVisibleWave}
        fullWave={fullWave}
        setFullWave={setFullWave}
      />
    </View>
  );
};

export default RecordingScreen;
