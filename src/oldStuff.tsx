import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

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
  const [duration, setDuration] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [visibleWave, setVisibleWave] = useState<number[]>([
    ...EMPTY_AUDIO_WAVE_ARRAY,
  ]);

  // const [fullWave, setFullWave] = useState<number[]>([...LEADING_DOTS_ARRAY]);
  const MOCK_FULL_WAVE = [
    75, 75, 74, 74, 73, 76, 65, 67, 66, 77, 76, 73, 78, 83, 76, 84, 86, 74, 56,
    65, 67, 75, 73, 87, 76, 78, 65, 65, 67, 67, 76, 75, 73, 74, 74, 73, 72, 75,
    75, 83, 82, 81, 80, 78, 75, 79, 77, 76, 77, 77,
  ];

  const [fullWave, setFullWave] = useState<number[]>([]);
  const scrollPositionRef = useRef<number>(0);

  const isPlaying = useAppSelector(selectIsPlaying);
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
      <AudioWaveDisplay isRecording={isRecording} wave={visibleWave} />
      <Timer duration={duration} />
      <RecordingControls
        duration={duration}
        setDuration={setDuration}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setVisibleWave={setVisibleWave}
        fullWave={fullWave}
        setFullWave={setFullWave}
      />
    </View>
  );
};

export default RecordingScreen;