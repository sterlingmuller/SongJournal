import {
  DbPage,
  FetchPagePayload,
  Page,
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

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
    };

    const page: Page = {
      lyrics: dbPage.lyrics,
      info: songInfo,
      revisionId: dbPage.revisionId,
    };

    return page;
  } catch (err) {
    console.error('Error fetching page', err);
  }
};

export const fetchPages = async (db: SQLiteDatabase) => {
  try {
    const dbPages: DbPage[] = await db.getAllAsync(
      'SELECT * FROM Page WHERE lyrics IS NOT NULL AND TRIM(lyrics) != ""',
    );

    const pages = Object.fromEntries(
      dbPages.map((dbPage: DbPage) => [
        dbPage.songId,
        {
          lyrics: dbPage.lyrics,
          info: {
            bpm: dbPage.bpm,
            keySignature: dbPage.keySignature,
            time: dbPage.time,
            about: dbPage.about,
          },
        },
      ]),
    );

    return pages;
  } catch (err) {
    console.error('Error fetching pages', err);
  }
};

export const updatePageInfo = async (payload: UpdatePageInfoPayload) => {
  const { songId, info, db } = payload;

  try {
    const clauses = Object.keys(info)
      .map((key: keyof Page) => `${key} = ?`)
      .join(', ');
    const params = Object.values(info);

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

    await db.runAsync(
      'UPDATE Songs SET hasLyrics = ? WHERE songId = ?',
      !!lyrics.trim(),
      songId,
    );
  } catch (err) {
    console.error('Error updating lyrics,', err);
  }
};
