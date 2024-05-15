import { SQLiteDatabase } from 'expo-sqlite';

export const getAllSongs = (db: SQLiteDatabase) =>
  db.getAllAsync('SELECT * FROM Songs');

export const getSongByTitle = (db: SQLiteDatabase, title: string) =>
  db.getFirstAsync('SELECT * FROM Songs WHERE title = ?', title);

export const addSong = (db: SQLiteDatabase, title: string) => {
  db.runAsync('INSERT INTO Songs (title) VALUES (?)', title);
  const row = getSongByTitle(db, title);

  return row;
};
