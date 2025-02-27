import { HomeSongsAudioProvider } from '@src/state/context/AudioContext';
import HomeScreen from '@src/screens/HomeScreen';

const HomeScreenAudioContainer = () => (
  <HomeSongsAudioProvider>
    <HomeScreen />
  </HomeSongsAudioProvider>
);

export default HomeScreenAudioContainer;
