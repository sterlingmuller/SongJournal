import React from 'react';
import { View } from 'react-native';
import StyledText from '@src/components/common/components/StyledText';
import formatDuration from '@src/utils/formatDuration';
import usePlaybackBarStyles from '@src/styles/playbackBar';

interface Props {
  currentTime: number;
}

const PlaybackDuration = ({ currentTime }: Props) => {
  const styles = usePlaybackBarStyles();

  return (
    <View style={styles.timeContainer}>
      <StyledText style={styles.timeText}>
        {formatDuration(currentTime)}
      </StyledText>
    </View>
  );
};

export default React.memo(PlaybackDuration);
