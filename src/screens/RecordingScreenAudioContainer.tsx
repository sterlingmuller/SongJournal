import { RecordingAudioProvider } from '@src/state/context/AudioContext';
import RecordingScreen from './RecordingScreen';
import { RecordingProvider } from '@src/state/context/RecordingContext';

const RecordingScreenAudioContainer = () => (
  <RecordingProvider>
    <RecordingAudioProvider>
      <RecordingScreen />
    </RecordingAudioProvider>
  </RecordingProvider>
);

export default RecordingScreenAudioContainer;
