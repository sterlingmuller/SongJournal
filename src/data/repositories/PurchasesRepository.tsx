import {
  Purchases,
  UpdatePurchasesDbPayload,
} from '@src/components/common/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const fetchPurchases = (db: SQLiteDatabase): Purchases => {
  try {
    return db.getFirstSync('SELECT * FROM Purchases');
  } catch (err) {
    console.error('Error fetching purchases', err);
  }
};

export const updatePurchases = async (payload: UpdatePurchasesDbPayload) => {
  const { updatedPurchases, db } = payload;

  try {
    if (updatedPurchases && Object.keys(updatedPurchases).length > 0) {
      const clauses = Object.keys(updatedPurchases)
        .map((key: keyof Purchases) => `${key} = ?`)
        .join(', ');
      const params = Object.values(updatedPurchases);

      await db.runAsync(`UPDATE Purchases SET ${clauses}`, ...params);
    }
  } catch (err) {
    console.error('Error updating purchases,', err);
  }
};
