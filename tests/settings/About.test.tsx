import { render, screen } from '@testing-library/react-native';

import About from '@src/components/settings/components/About';
import StyledText from '@src/components/common/components/StyledText';
import { ReactNode } from 'react';

jest.mock('@styles/settings', () => {
  return jest.fn(() => ({}));
});

jest.mock('@src/common/components/StyledText', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Text } = require('react-native');

  return jest.fn(({ children }: { children?: ReactNode }) => (
    <Text>{children}</Text>
  ));
});

const mockStyledText = StyledText as jest.MockedFunction<typeof StyledText>;

describe('About', () => {
  it('renders StyledText with the expected text', () => {
    render(<About />);

    expect(mockStyledText).toBeDefined();
    expect(screen.getByText('About')).toBeTruthy();
  });
});
