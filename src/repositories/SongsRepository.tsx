import { createSongPayload, page, songInfo, take } from '@src/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchSongs = (db: SQLiteDatabase) =>
  db.getAllSync('SELECT selectedTakeID, songId, title, totalTakes FROM Songs');

export const getTakesAndPageBySongId = (db: SQLiteDatabase, songId: number) => {
  const takes: take[] = db.getAllSync(
    'SELECT * FROM Takes WHERE songId = ?',
    songId,
  );

  const page: page = db.getFirstSync(
    'SELECT * FROM Page WHERE songId = ?',
    songId,
  );

  return { takes, page };
};

export const createSong = async ({ db, title }: createSongPayload) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO Songs (title, selectedTakeId, totalTakes) VALUES (?, -1, 0)',
      title,
    );
    const songId = result.lastInsertRowId;

    await db.runAsync(
      'INSERT INTO Page (songId, completed, lyrics, bpm, keySignature, time, about) VALUES (?, false, "", "", "", "", "")',
      songId,
    );

    const song: songInfo = db.getFirstSync(
      'SELECT * FROM Songs WHERE songId = ?',
      songId,
    );

    const page: page = db.getFirstSync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    return { ...song, page, takes: [] };
  } catch (err) {
    console.error('Error inserting song', err);
  }
};

export const deleteSong = async (db: SQLiteDatabase, songId: number) => {
  const statement = await db.prepareAsync(
    'DELETE FROM Songs WHERE songId = $songId; DELETE FROM Takes WHERE songId = $songId; DELETE FROM Page WHERE songId = $songId;',
  );

  try {
    await statement.executeAsync({ $songId: songId });
  } catch (err) {
    console.error('Error deleting song', err);
  }
};
