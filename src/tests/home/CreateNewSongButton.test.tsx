import { render, fireEvent, screen } from '@testing-library/react-native';

import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import NewSongIcon from '@src/icons/NewSongIcon';

jest.mock('@styles/createNewSongButton', () => {
  return jest.fn(() => ({}));
});

const mockSetIsNewSongOpen = jest.fn();
const mockNewSongIcon = NewSongIcon as jest.MockedFunction<typeof NewSongIcon>;

describe('CreateNewSongButton', () => {
  it('renders the NewSongIcon', () => {
    render(<CreateNewSongButton setIsNewSongOpen={mockSetIsNewSongOpen} />);

    expect(mockNewSongIcon).toBeDefined();
  });

  describe('When pressed', () => {
    it('calls the provided setIsNewSongOpen', () => {
      render(<CreateNewSongButton setIsNewSongOpen={mockSetIsNewSongOpen} />);

      fireEvent.press(screen.getByTestId('touchable-opacity'));

      expect(mockSetIsNewSongOpen).toHaveBeenCalled();
    });
  });
});
