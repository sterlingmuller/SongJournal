import { SongTakesAudioProvider } from '@src/state/context/AudioContext';
import SongScreen from '@src/screens/SongScreen';

const SongScreenAudioContainer = () => (
  <SongTakesAudioProvider>
    <SongScreen />
  </SongTakesAudioProvider>
);

export default SongScreenAudioContainer;
