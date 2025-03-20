import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/components/common/types';

export const fetchSongsWithArtists = async (db: SQLiteDatabase) =>
  db.getAllSync(
    'SELECT songId, creationDate, title, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal, artistId FROM Songs',
  );

export const getTakesAndPageBySongId = (db: SQLiteDatabase, songId: number) => {
  const takes: t.Takes = db.getAllSync('SELECT * FROM Takes WHERE songId = ?', [
    songId,
  ]);

  const page: t.Page = db.getFirstSync('SELECT * FROM Page WHERE songId = ?', [
    songId,
  ]);

  return { takes, page };
};

export const createSong = async ({ db, title }: t.CreateSongPayload) => {
  try {
    const settings: { defaultArtistId: number } = await db.getFirstAsync(
      'SELECT defaultArtistId FROM Settings',
    );

    const defaultArtistId = settings.defaultArtistId;
    const creationDate = new Date().toISOString();

    const result = await db.runAsync(
      'INSERT INTO Songs (title, artistId, creationDate, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, defaultArtistId, creationDate, -1, 0, false, false, true],
    );
    const songId = result.lastInsertRowId;

    await db.runAsync(
      'INSERT INTO Page (songId, lyrics, bpm, keySignature, time, about) VALUES (?, ?, ?, ?, ?, ?)',
      [songId, '', '', '', '', ''],
    );

    const song: t.DbSong = await db.getFirstAsync(
      'SELECT songId, creationDate, title, selectedTakeId, totalTakes, completed, hasLyrics, isOriginal, artistId FROM Songs WHERE songId = ?',
      [songId],
    );

    const page: t.Page = db.getFirstSync(
      'SELECT * FROM Page WHERE songId = ?',
      [songId],
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
    await db.runAsync('UPDATE Songs SET selectedTakeId = ? WHERE songId = ?', [
      takeId,
      songId,
    ]);
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
    await db.runAsync('UPDATE Songs SET title = ? WHERE songId = ?', [
      title,
      songId,
    ]);
  } catch (err) {
    console.error('Error updating song title', err);
  }
};

export const updateSongArtist = async ({
  db,
  songId,
  artistId,
}: t.UpdateSongArtistSagaPayload) => {
  try {
    await db.runAsync('UPDATE Songs SET artistId = ? WHERE songId = ?', [
      artistId,
      songId,
    ]);
  } catch (err) {
    console.error('Error updating song artist', err);
  }
};

export const updateSongCompletion = async ({
  db,
  songId,
  completed,
}: t.UpdateSongCompletionSagaPayload) => {
  try {
    await db.runAsync('UPDATE Songs SET completed = ? WHERE songId = ?', [
      completed,
      songId,
    ]);
  } catch (err) {
    console.error('Error updating song completion', err);
  }
};
