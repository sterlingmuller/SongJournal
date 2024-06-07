import { fetchPagePayload, page } from '@src/common/types';

export const fetchPageBySongId = async (payload: fetchPagePayload) => {
  const { db, songId } = payload;

  try {
    const page: page = await db.getFirstAsync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    return page;
  } catch (err) {
    console.error('Error fetching page', err);
  }
};
