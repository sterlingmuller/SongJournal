import {
  DbPage,
  FetchPagePayload,
  Page,
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
} from '@src/components/common/types';

export const fetchPageBySongId = async (payload: FetchPagePayload) => {
  const { db, songId } = payload;

  try {
    const dbPage: DbPage = await db.getFirstAsync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    const songInfo = {
      bpm: dbPage.bpm,
      keySignature: dbPage.keySignature,
      time: dbPage.time,
      about: dbPage.about,
      completed: dbPage.completed,
    };

    const page: Page = { lyrics: dbPage.lyrics, info: songInfo };

    return page;
  } catch (err) {
    console.error('Error fetching page', err);
  }
};

export const updatePageInfo = async (payload: UpdatePageInfoPayload) => {
  const { songId, info: updates, db } = payload;

  try {
    const clauses = Object.keys(updates)
      .map((key: keyof Page) => `${key} = ?`)
      .join(', ');

    const params = Object.values(updates);

    await db.runAsync(
      `UPDATE Page SET ${clauses} WHERE songId = ?`,
      ...params,
      songId,
    );
  } catch (err) {
    console.error('Error updating page,', err);
  }
};

export const updateLyrics = async (payload: UpdateLyricsPayload) => {
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
