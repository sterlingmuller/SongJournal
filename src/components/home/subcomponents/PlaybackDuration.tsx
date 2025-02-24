import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import usePlaybackBarStyles from '@src/styles/playbackBar';
import { useAudioPlayer } from '@src/state/context/AudioContext';

const PlaybackDuration = () => {
  const styles = usePlaybackBarStyles();
  const { subscribeToPlaybackStatus } = useAudioPlayer();
  const [displayTime, setDisplayTime] = useState(0);

  const formattedDuration = useMemo(
    () => formatDuration(displayTime),
    [displayTime],
  );

  useEffect(() => {
    const unsubscribe = subscribeToPlaybackStatus((position: number) => {
      setDisplayTime(position);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.timeContainer}>
      <StyledText style={styles.timeText}>{formattedDuration}</StyledText>
    </View>
  );
};

export default React.memo(PlaybackDuration);
