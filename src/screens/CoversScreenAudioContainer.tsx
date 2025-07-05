import { CoverSongsAudioProvider } from '@src/state/context/AudioContext';
import CoversScreen from './CoversScreen';

const CoversScreenAudioContainer = () => (
  <CoverSongsAudioProvider>
    <CoversScreen />
  </CoverSongsAudioProvider>
);

export default CoversScreenAudioContainer;
