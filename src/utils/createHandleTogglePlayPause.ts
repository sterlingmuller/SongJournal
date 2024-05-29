import { playRecording } from './startStopPlayRecording';

// Need to figure out how I'm storing Playback info. Local / redux / context?
// We need to create a reference to a sound that can be played, paused, resumed. Pressing on another take will reset this ref.

export const createHandleTogglePlayPause = (
  playingId: number,
  setPlayingId: (value: number) => void,
) => {
  return (currentId: number, uri: string) => {
    if (playingId !== currentId) {
      setPlayingId(currentId);
      playRecording(uri);
    } else {
      setPlayingId(-1);
      pau;
    }
  };
};
