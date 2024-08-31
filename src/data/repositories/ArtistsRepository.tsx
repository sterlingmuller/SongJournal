import {
  AddArtistDbPayload,
  Artists,
  DeleteArtistDbPayload,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchArtists = (db: SQLiteDatabase): Artists => {
  try {
    return db.getAllSync('SELECT artistId, name FROM Artists');
  } catch (err) {
    console.error('Error fetching artist', err);
  }
};

export const addArtist = async ({ name, db }: AddArtistDbPayload) => {
  try {
    await db.runAsync('INSERT INTO Artists (name) VALUES (?)', [name]);
  } catch (err) {
    console.error('Error adding artist', err);
  }
};

export const deleteArtist = ({ db, artistId }: DeleteArtistDbPayload) => {
  try {
    db.runSync('DELETE FROM Artists WHERE artistId = ?', artistId);
  } catch (err) {
    console.error('Error deleting artist', err);
  }
};
