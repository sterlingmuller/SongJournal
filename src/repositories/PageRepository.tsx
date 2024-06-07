import { page } from '@src/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchPageBySongId = async (db: SQLiteDatabase, songId: number) => {
  try {
    const page: page = await db.getFirstAsync(
      'SELECT * FROM Page WHERE songId = ?',
      songId,
    );

    return page;
  } catch (err) {
    console.error('Error fetching page', err);
  }
};
