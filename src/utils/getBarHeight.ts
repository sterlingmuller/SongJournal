import { HEIGHT_MAPPING } from '@src/components/common/constants';

const getBarHeight = (level: number): number => {
  for (let i = 1; i < HEIGHT_MAPPING.length; i++) {
    if (level < HEIGHT_MAPPING[i][0]) {
      return HEIGHT_MAPPING[i - 1][1];
    }
  }
  return HEIGHT_MAPPING[HEIGHT_MAPPING.length - 1][1];
};

export default getBarHeight;
