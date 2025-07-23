import {
  AddArtistDbPayload,
  Artists,
  DeleteArtistDbPayload,
  UpdateArtistDbPayload,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchArtists = async (db: SQLiteDatabase): Promise<Artists> => {
  try {
    return db.getAllSync('SELECT artistId, name FROM Artists');
  } catch (err) {
    console.error('Error fetching artist', err);
  }
};

export const addArtist = async ({ name, db }: AddArtistDbPayload) => {
  try {
    const result = await db.runAsync('INSERT INTO Artists (name) VALUES (?)', [
      name,
    ]);

    const newArtistId = result.lastInsertRowId;

    const newArtist = await db.getFirstAsync(
      'SELECT * FROM Artists WHERE artistId = ?',
      [newArtistId]
    );

    return newArtist;
  } catch (err) {
    console.error('Error adding artist', err);
  }
};

export const updateArtist = async ({
  artistId,
  name,
  db,
}: UpdateArtistDbPayload) => {
  try {
    await db.runAsync('UPDATE Artists SET name = ? WHERE artistId = ?', [
      name,
      artistId,
    ]);
  } catch (err) {
    console.error('Error updating artist', err);
  }
};

export const deleteArtist = ({ db, artistId }: DeleteArtistDbPayload) => {
  try {
    db.runSync('DELETE FROM Artists WHERE artistId = ?', [artistId]);
  } catch (err) {
    console.error('Error deleting artist', err);
  }
};
