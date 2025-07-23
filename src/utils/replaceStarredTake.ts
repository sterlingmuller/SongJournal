import { Takes } from '@src/components/common/types';

export const findReplacementStarredTakeId = (
  deletedTakeId: number,
  takes: Takes
) => {
  for (let i = takes.length - 1; i >= 0; i--) {
    if (takes[i].takeId !== deletedTakeId) {
      return takes[i].takeId;
    }
  }
  return -1;
};
