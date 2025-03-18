import { useColorTheme } from '@src/state/context/ThemeContext';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
}

const CheckIcon = ({ size = 24 }: Props) => {
  const { theme } = useColorTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M20.7363 6.6738L9.7363 17.6738C9.67245 17.7377 9.59663 17.7884 9.51317 17.823C9.4297 17.8576 9.34024 17.8754 9.24989 17.8754C9.15955 17.8754 9.07008 17.8576 8.98662 17.823C8.90316 17.7884 8.82734 17.7377 8.76349 17.6738L3.95099 12.8613C3.82198 12.7323 3.74951 12.5573 3.74951 12.3749C3.74951 12.1925 3.82198 12.0175 3.95099 11.8885C4.07999 11.7595 4.25496 11.687 4.43739 11.687C4.61983 11.687 4.7948 11.7595 4.9238 11.8885L9.24989 16.2154L19.7635 5.70099C19.8925 5.57198 20.0675 5.49951 20.2499 5.49951C20.4323 5.49951 20.6073 5.57198 20.7363 5.70099C20.8653 5.82999 20.9378 6.00496 20.9378 6.18739C20.9378 6.36983 20.8653 6.5448 20.7363 6.6738Z"
        stroke={theme.primaryText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
