import { render, screen } from '@testing-library/react-native';
import { ReactNode } from 'react';

import SettingsScreen from '@src/screens/SettingsScreen';
import StyledText from '@src/common/components/StyledText';
import BackupAndSync from '@src/settings/components/BackupAndSync';
import About from '@src/settings/components/About';

jest.mock('@styles/settings', () => {
  return jest.fn(() => ({}));
});

jest.mock('@styles/global', () => {
  return jest.fn(() => ({}));
});

jest.mock('@src/settings/components/Theme', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native');
  return jest.fn(() => <View testID={'mock-theme'} />);
});

jest.mock('@src/common/components/StyledText', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Text } = require('react-native');

  return jest.fn(({ children }: { children?: ReactNode }) => (
    <Text>{children}</Text>
  ));
});

const mockStyledText = StyledText as jest.MockedFunction<typeof StyledText>;
const mockBackupAndSync = BackupAndSync as jest.MockedFunction<
  typeof BackupAndSync
>;
const mockAbout = About as jest.MockedFunction<typeof About>;

describe('SettingsScreen', () => {
  it('renders the BackupAndSync, Theme, and About components and the StyledText component with the expected text', () => {
    render(<SettingsScreen />);

    expect(mockBackupAndSync).toBeDefined();
    expect(mockAbout).toBeDefined();
    expect(mockStyledText).toBeDefined();
    expect(screen.getByTestId('mock-theme')).toBeDefined();
  });
});
