import { SQLiteDatabase } from 'expo-sqlite';

import {
  CreateSongPayload,
  Page,
  DbSong,
  UpdateSelectedTakeIdPayloadDb,
  Takes,
  DeleteSongPayload,
} from '@src/components/common/types';

export const fetchSongs = (db: SQLiteDatabase) =>
  db.getAllSync(
    'SELECT selectedTakeID, songId, title, totalTakes, completed, hasLyrics FROM Songs',
  );

export const getTakesAndPageBySongId = (db: SQLiteDatabase, songId: number) => {
  const takes: Takes = db.getAllSync(
    'SELECT * FROM Takes WHERE songId = ?',
    songId,
  );

  const page: Page = db.getFirstSync(
    'SELECT * FROM Page WHERE songId = ?',
    songId,
  );

  return { takes, page };
};

export const createSong = async ({ db, title }: CreateSongPayload) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO Songs (title, selectedTakeId, totalTakes, completed, hasLyrics) VALUES (?, -1, 0, false, false)',
      title,
    );
    const songId = result.lastInsertRowId;

    await db.runAsync(
      'INSERT INTO Page (songId, lyrics, bpm, keySignature, time, about) VALUES (?, "", "", "", "", "")',
      songId,
    );

    const song: DbSong = db.getFirstSync(
      'SELECT * FROM Songs WHERE songId = ?',
      songId,
    );

    const page: Page = db.getFirstSync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    return { ...song, page, takes: [] };
  } catch (err) {
    console.error('Error inserting song', err);
  }
};

export const deleteSong = async ({ db, songId }: DeleteSongPayload) => {
  const statement = await db.prepareAsync(
    'DELETE FROM Songs WHERE songId = $songId; DELETE FROM Takes WHERE songId = $songId; DELETE FROM Page WHERE songId = $songId;',
  );

  try {
    await statement.executeAsync({ $songId: songId });
  } catch (err) {
    console.error('Error deleting song', err);
  }
};

export const updateSelectedTakeId = async ({
  db,
  songId,
  takeId,
}: UpdateSelectedTakeIdPayloadDb) => {
  try {
    await db.runAsync(
      'UPDATE Songs SET selectedTakeId = ? WHERE songId = ?',
      takeId,
      songId,
    );
  } catch (err) {
    console.error('Error updating selectedTakeId', err);
  }
};
