import { take, takePayload } from '@src/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const createTake = async (takePayload: takePayload) => {
  const { songId, title, date, uri, duration, db } = takePayload;

  try {
    const result = await db.runAsync(
      'INSERT INTO Takes (songId, title, date, uri, duration, notes) VALUES (?, ?, ?, ?, ?, "")',
      [songId, title, date, uri, duration],
    );

    const takeId = result.lastInsertRowId;

    await db.runAsync(
      'UPDATE songs SET totalTakes = totalTakes + 1 WHERE songId = songId;',
    );

    const totalTakes: number = db.getFirstSync(
      'SELECT totalTakes FROM Songs WHERE songId = ?',
      songId,
    );

    console.log('repository total takes:', totalTakes);

    const take: take = db.getFirstSync(
      'SELECT * FROM Takes WHERE takeId = ?',
      takeId,
    );

    console.log('NEW TAKE:', take);

    return take;
  } catch (err) {
    console.error('Error inserting take', err);
  }
};

export const deleteTake = async (db: SQLiteDatabase, songId: number) => {
  const statement = await db.prepareAsync(
    'DELETE FROM Songs WHERE songId = $songId; DELETE FROM Takes WHERE songId = $songId; DELETE FROM Page WHERE songId = $songId;',
  );

  try {
    await statement.executeAsync({ $songId: songId });
  } catch (err) {
    console.error('Error deleting song', err);
  }
};
