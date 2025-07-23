/**
 * Calculates hitSlop to ensure a minimum touch area of 48dp.
 * @param visualSize - Current dimensions of the visible element (e.g., { width: 20, height: 20 }).
 * @returns hitSlop values to expand the touch area to 48dp.
 */

import { MIN_TOUCH_SIZE } from '@src/components/common/constants';

export const calculateHitSlop = (visualSize: {
  width: number;
  height: number;
}) => {
  const horizontalPad = Math.max(0, (MIN_TOUCH_SIZE - visualSize.width) / 2);
  const verticalPad = Math.max(0, (MIN_TOUCH_SIZE - visualSize.height) / 2);

  return {
    top: verticalPad,
    bottom: verticalPad,
    left: horizontalPad,
    right: horizontalPad,
  };
};
