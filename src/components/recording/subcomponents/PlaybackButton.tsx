import React from 'react';
import { TouchableOpacity } from 'react-native';

import PlayRecordingPlaybackIcon from '@src/icons/PlayRecordingPlaybackIcon';
import PauseRecordingPlaybackIcon from '@src/icons/PauseRecordingPlaybackIcon';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { useAudioPlayer } from '@src/state/context/AudioContext';

interface Props {
  uri: string;
  songId: number;
}

const PlaybackButton = ({ uri, songId }: Props) => {
  const isPlaying = useAppSelector(selectIsPlaying);
  const { togglePlayback } = useAudioPlayer();

  const handlePlaybackPress = () => {
    togglePlayback(uri, songId);
  };

  return (
    <TouchableOpacity style={{}} onPress={handlePlaybackPress}>
      {isPlaying ? (
        <PauseRecordingPlaybackIcon />
      ) : (
        <PlayRecordingPlaybackIcon />
      )}
    </TouchableOpacity>
  );
};

export default PlaybackButton;
