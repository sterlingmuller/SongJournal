import { useColorTheme } from '@src/state/context/ThemeContext';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HyphenIcon = () => {
  const { theme } = useColorTheme();

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M4.57143 11L19.4286 11C19.5801 11 19.7255 11.2107 19.8326 11.5858C19.9398 11.9609 20 12.4696 20 13C20 13.5304 19.9398 14.0391 19.8326 14.4142C19.7255 14.7893 19.5801 15 19.4286 15L4.57143 15C4.41988 15 4.27453 14.7893 4.16737 14.4142C4.0602 14.0391 4 13.5304 4 13C4 12.4696 4.0602 11.9609 4.16737 11.5858C4.27453 11.2107 4.41988 11 4.57143 11Z"
        fill={theme.secondaryText}
      />
    </Svg>
  );
};

export default HyphenIcon;
