import { useColorTheme } from '@src/state/context/ThemeContext';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ItalicIcon = () => {
  const { theme } = useColorTheme();

  return (
    <Svg width={16} height={16} viewBox="4 4 16 16">
      <Path
        d="M5 19v-2.5h4l3-9H8V5h10v2.5h-3.5l-3 9H15V19z"
        fill={theme.secondaryText}
      />
    </Svg>
  );
};

export default ItalicIcon;
