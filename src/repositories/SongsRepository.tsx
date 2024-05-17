import { SQLiteDatabase } from 'expo-sqlite';

export const getAllSongs = (db: SQLiteDatabase) =>
  db.getAllSync('SELECT selectedTakeID, songId, title FROM Songs');

export const getSongTakesBySongId = (db: SQLiteDatabase, songId: number) =>
  db.getFirstSync('SELECT * FROM Takes WHERE songId = ?', songId);

export const addSong = async (db: SQLiteDatabase, title: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO Songs (title, selectedTakeId) VALUES (?, 0)',
      title,
    );
    const songId = result.lastInsertRowId;

    await db.runAsync(
      'INSERT INTO Page (songId, completed, lyrics, bpm, keySignature, time, about) VALUES (?, false, "", "", "", "", "")',
      songId,
    );

    const song = db.getFirstSync(
      'SELECT * FROM Songs WHERE songId = ?',
      songId,
    );
    // const takes = db.getFirstSync(
    //   'SELECT * FROM Takes WHERE songId = ?',
    //   songId,
    // );
    // const page = db.getFirstSync('SELECT * FROM Page WHERE songId = ?', songId);

    // console.log('song eep: ', { song, takes, page });

    return song;
  } catch (err) {
    console.error('Error inserting song', err);
  }
};
