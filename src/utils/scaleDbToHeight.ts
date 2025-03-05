import { HEIGHT_MAPPING } from '@src/components/common/constants';

export const scaleDbToHeight = (decibelValue: number): number => {
  for (let i = 0; i < HEIGHT_MAPPING.length; i++) {
    if (decibelValue <= HEIGHT_MAPPING[i][0]) {
      return HEIGHT_MAPPING[i][1];
    }
  }
  return HEIGHT_MAPPING[HEIGHT_MAPPING.length - 1][1];
};
