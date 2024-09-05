import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/components/common/types';

export const fetchSongsWithArtists = (db: SQLiteDatabase) =>
  db.getAllSync(
    'SELECT songId, title, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal, Artists.name as artist FROM Songs LEFT JOIN Artists ON Songs.artistId = Artists.artistId',
  );

export const getTakesAndPageBySongId = (db: SQLiteDatabase, songId: number) => {
  const takes: t.Takes = db.getAllSync(
    'SELECT * FROM Takes WHERE songId = ?',
    songId,
  );

  const page: t.Page = db.getFirstSync(
    'SELECT * FROM Page WHERE songId = ?',
    songId,
  );

  return { takes, page };
};

export const createSong = async ({ db, title }: t.CreateSongPayload) => {
  try {
    const defaultArtistId: number = await db.getFirstAsync(
      'SELECT defaultArtistId FROM Settings',
    );

    const result = await db.runAsync(
      'INSERT INTO Songs (title, artistId, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal) VALUES (?, ?, -1, 0, false, false, true)',
      title,
      defaultArtistId,
    );
    const songId = result.lastInsertRowId;

    await db.runAsync(
      'INSERT INTO Page (songId, lyrics, bpm, keySignature, time, about) VALUES (?, "", "", "", "", "")',
      songId,
    );

    const song: t.DbSong = await db.getFirstAsync(
      `SELECT songId, title, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal, Artists.name as artist FROM Songs LEFT JOIN Artists ON Songs.artistId = Artists.artistId WHERE Songs.songId = ?`,
      songId,
    );

    const page: t.Page = db.getFirstSync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    return { ...song, page, takes: [] };
  } catch (err) {
    console.error('Error inserting song', err);
  }
};

export const deleteSong = async ({ db, songId }: t.DeleteSongPayload) => {
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
}: t.UpdateSelectedTakeIdPayloadDb) => {
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

export const updateSongTitle = async ({
  db,
  songId,
  title,
}: t.UpdateSongTitleSagaPayload) => {
  try {
    await db.runAsync(
      'UPDATE Songs SET title = ? WHERE songId = ?',
      title,
      songId,
    );
  } catch (err) {
    console.error('Error updating song title', err);
  }
};
