import { SQLiteDatabase } from 'expo-sqlite';

import * as t from '@src/components/common/types';

export const createTake = async (takePayload: t.TakePayload) => {
  const { songId, title, date, uri, duration, db } = takePayload;

  try {
    const result = await db.runAsync(
      'INSERT INTO Takes (songId, title, date, uri, duration, notes) VALUES (?, ?, ?, ?, ?, "")',
      [songId, title, date, uri, duration],
    );

    const takeId = result.lastInsertRowId;

    await db.runAsync(
      'UPDATE Songs SET totalTakes = totalTakes + 1 WHERE songId = ?;',
      songId,
    );
    await db.runAsync(
      'UPDATE Songs Set selectedTakeId = ? WHERE selectedTakeId = -1;',
      takeId,
    );

    const take: t.Take = db.getFirstSync(
      'SELECT * FROM Takes WHERE takeId = ?',
      takeId,
    );

    return take;
  } catch (err) {
    console.error('Error inserting take', err);
  }
};

export const deleteTake = ({ db, takeId }: t.DeleteTakeDbPayload) => {
  try {
    db.runSync('DELETE FROM Takes WHERE takeId = ?', takeId);
  } catch (err) {
    console.error('Error deleting take', err);
  }
};

export const fetchTakes = (db: SQLiteDatabase): t.Takes =>
  db.getAllSync(
    'SELECT takeId, songId, title, date, notes, uri, duration FROM Takes',
  );

export const updateTakeNotes = (payload: t.UpdateTakeNotesDbPayload) => {
  const { db, takeId, notes } = payload;

  try {
    db.runSync('UPDATE Takes SET notes = ? WHERE takeId = ?', [notes, takeId]);
  } catch (err) {
    console.error('Error creating or updating notes', err);
  }
};

export const updateTakeTitle = async ({
  db,
  takeId,
  title,
}: t.UpdateTakeTitleDbPayload) => {
  try {
    await db.runAsync(
      'UPDATE Takes SET title = ? WHERE takeId = ?',
      title,
      takeId,
    );
  } catch (err) {
    console.error('Error updating take title', err);
  }
};
