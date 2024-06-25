import {
  fetchPagePayload,
  page,
  updateLyricsPayload,
  updatePageInfoPayload,
} from '@src/common/types';

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

export const updatePageInfo = async (payload: updatePageInfoPayload) => {
  const { songId, page: updates } = payload;

  try {
    const clauses = Object.keys(updates)
      .map((key: keyof page) => `${key} = ?`)
      .join(', ');

    const params = Object.values(updates);

    console.log('clauses', clauses);
    console.log('params', params);
    const updatedPage: page = {};

    return updatedPage;
  } catch (err) {
    console.error('Error updating page,', err);
  }
};

export const updateLyrics = async (payload: updateLyricsPayload) => {
  const { songId, lyrics, db } = payload;

  try {
    await db.runAsync(
      'UPDATE Page SET lyrics = ? WHERE songId = ?',
      lyrics,
      songId,
    );
  } catch (err) {
    console.error('Error updating lyrics,', err);
  }
};
