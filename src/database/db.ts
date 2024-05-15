import { type SQLiteDatabase } from 'expo-sqlite';

const createSongsTable =
  'CREATE TABLE IF NOT EXISTS Songs (SongID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, SelectedTakeID INTEGER, FOREIGN KEY (SelectedTakeID) REFERENCES Takes(TakeID));';

const createTakesTable =
  'CREATE TABLE IF NOT EXISTS Takes (TakeID INTEGER PRIMARY KEY AUTOINCREMENT, SongID INTEGER NOT NULL, Title TEXT NOT NULL, Date TEXT NOT NULL, Notes TEXT, FOREIGN KEY (SongID) REFERENCES Songs(SongID));';

const createPageTable =
  'CREATE TABLE IF NOT EXISTS Page (SongID INTEGER PRIMARY KEY AUTOINCREMENT, Lyircs TEXT, FOREIGN KEY (SongID) REFERENCES Songs(SongID));';

const createInfoTable =
  'CREATE TABLE IF NOT EXISTS Info (SongID INTEGER PRIMARY KEY AUTOINCREMENT, BPM TEXT, KeySignature TEXT, Time TEXT, About TEXT, Completed BOOLEAN NOT NULL, FOREIGN KEY (SongID) REFERENCES Pages(SongID));';

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version');
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(
      `PRAGMA journal_mode = 'wal';` +
        createSongsTable +
        createTakesTable +
        createPageTable +
        createInfoTable,
    );

    await db.runAsync('INSERT INTO Songs (Title) VALUES (?, ?)', 'test');

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
