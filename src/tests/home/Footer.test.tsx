import { fireEvent, render, screen } from '@testing-library/react-native';

import Footer from '@src/home/components/Footer';
import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@styles/homeFooter', () => {
  return jest.fn(() => ({}));
});

const mockPlaylistIcon = PlaylistIcon as jest.MockedFunction<
  typeof PlaylistIcon
>;
const mockMusicPlayerIcon = MusicPlayerIcon as jest.MockedFunction<
  typeof MusicPlayerIcon
>;
const mockSettingIcon = SettingIcon as jest.MockedFunction<typeof SettingIcon>;

describe('Footer', () => {
  it('renders the playlist, music player, and setting icons', () => {
    render(<Footer />);

    expect(mockPlaylistIcon).toBeDefined();
    expect(mockMusicPlayerIcon).toBeDefined();
    expect(mockSettingIcon).toBeDefined();
  });

  describe('when the music player icon is pressed', () => {
    it('navigates to the music player screen', () => {
      render(<Footer />);

      fireEvent.press(screen.getByTestId('music-player-TO'));

      expect(mockNavigate).toHaveBeenCalledWith('MusicPlayer');
    });
  });

  describe('when the settings icon is pressed', () => {
    it('navigates to the settings screen', () => {
      render(<Footer />);

      fireEvent.press(screen.getByTestId('settings-TO'));

      expect(mockNavigate).toHaveBeenCalledWith('Settings');
    });
  });
});
