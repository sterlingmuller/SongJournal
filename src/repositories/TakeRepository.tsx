import { take, takePayload } from '@src/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const createTake = async (
  db: SQLiteDatabase,
  takePayload: takePayload,
) => {
  const { songId, title, date, uri, duration } = takePayload;
  console.log("we're tryin. in the take repo");

  try {
    const result = await db.runAsync(
      'INSERT INTO Takes (songId, title, date, uri, duration, notes) VALUES (?, ?, ?, ?, ?, "")',
      [songId, title, date, uri, duration],
    );
    const takeId = result.lastInsertRowId;

    const take: take = db.getFirstSync(
      'SELECT * FROM Takes WHERE takeId = ?',
      takeId,
    );

    console.log('NEEEEW TAKE!', take);

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
