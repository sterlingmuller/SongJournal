import React, { useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [wave, setWave] = useState<number[]>([]);
  // const scrollPositionRef = useRef<number>(0);

  const isPlaying = useAppSelector(selectIsPlaying);
  // const intervalId: NodeJS.Timeout | null = null;

  // useEffect(() => {
  //   if (!isRecording && duration) {
  //     setVisibleWave([...fullWave.slice(0, MAX_AUDIO_WAVE_BARS)]);
  //   } else if (!isRecording && !duration) {
  //     setVisibleWave([...EMPTY_AUDIO_WAVE_ARRAY]);
  //   }
  // }, [isRecording, duration, isPlaying]);

  // const updatePlaybackWavePosition = () => {
  //   const newPos = scrollPositionRef.current + 1;
  //   scrollPositionRef.current = newPos;

  //   const visibleWave = wave.slice(
  //     scrollPositionRef.current,
  //     scrollPositionRef.current + MAX_AUDIO_WAVE_BARS,
  //   );

  //   while (visibleWave.length < MAX_AUDIO_WAVE_BARS) {
  //     visibleWave.push(null);
  //   }

  //   setVisibleWave(visibleWave);
  // };

  // useEffect(() => {
  //   if (isPlaying) {
  //     intervalId = setInterval(
  //       updatePlaybackWavePosition,
  //       AUDIO_UPDATE_INTERVAL,
  //     );
  //   }

  //   return () => {
  //     if (intervalId) {
  //       scrollPositionRef.current = 0;
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [isPlaying]);

  return (
    <View style={styles.container}>
      <AudioWaveDisplay isRecording={isRecording} wave={wave} />
      <Timer recordingDuration={recordingDuration} isRecording={isRecording} />
      <RecordingControls
        recordingDuration={recordingDuration}
        setRecordingDuration={setRecordingDuration}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setWave={setWave}
      />
    </View>
  );
};

export default RecordingScreen;
