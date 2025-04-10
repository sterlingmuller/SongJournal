import { useColorTheme } from '@src/state/context/ThemeContext';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CloseIcon = ({ size = 24, color }: Props) => {
  const { theme } = useColorTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M4 4L18 18M18 4L4 18"
        stroke={color ? color : theme.primaryText}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
