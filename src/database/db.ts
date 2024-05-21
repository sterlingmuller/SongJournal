import { type SQLiteDatabase } from 'expo-sqlite';

const createSongsTable =
  'CREATE TABLE IF NOT EXISTS Songs (songId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, selectedTakeId INTEGER, FOREIGN KEY (selectedTakeId) REFERENCES Takes(takeId));';

const createTakesTable =
  'CREATE TABLE IF NOT EXISTS Takes (takeId INTEGER PRIMARY KEY AUTOINCREMENT, songId INTEGER NOT NULL, title TEXT NOT NULL, date TEXT NOT NULL, notes TEXT, uri TEXT, duration INT, FOREIGN KEY (songId) REFERENCES Songs(songId));';

const createPageTable =
  'CREATE TABLE IF NOT EXISTS Page (pageId INTEGER PRIMARY KEY AUTOINCREMENT, songId INTEGER NOT NULL, lyrics TEXT, bpm TEXT, keySignature TEXT, time TEXT, about TEXT, completed BOOLEAN NOT NULL, FOREIGN KEY (songId) REFERENCES Songs(songId));';

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
        createPageTable,
    );

    currentDbVersion = 1;

    console.log('currentDbVersion', currentDbVersion);
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
