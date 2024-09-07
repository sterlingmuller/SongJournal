import { type SQLiteDatabase } from 'expo-sqlite';

const createSongsTable =
  'CREATE TABLE IF NOT EXISTS Songs (songId INTEGER PRIMARY KEY AUTOINCREMENT, creationDate STRING NOT NULL, title TEXT UNIQUE, selectedTakeId INTEGER, totalTakes INTEGER, completed BOOLEAN NOT NULL, hasLyrics BOOLEAN NOT NULL, isOriginal BOOLEAN, artistId INTEGER, FOREIGN KEY (selectedTakeId) REFERENCES Takes(takeId), FOREIGN KEY (artistId) REFERENCES Artists(artistId));';

const createTakesTable =
  'CREATE TABLE IF NOT EXISTS Takes (takeId INTEGER PRIMARY KEY AUTOINCREMENT, songId INTEGER NOT NULL, title TEXT NOT NULL, date TEXT NOT NULL, notes TEXT, uri TEXT, duration INT, FOREIGN KEY (songId) REFERENCES Songs(songId));';

const createPageTable =
  'CREATE TABLE IF NOT EXISTS Page (pageId INTEGER PRIMARY KEY AUTOINCREMENT, songId INTEGER NOT NULL, lyrics TEXT, bpm TEXT, keySignature TEXT, time TEXT, about TEXT, FOREIGN KEY (songId) REFERENCES Songs(songId));';

const createSettingsTable = `
CREATE TABLE IF NOT EXISTS Settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  defaultSortType TEXT NOT NULL DEFAULT 'Date',
  isAscending BOOLEAN NOT NULL DEFAULT 0,
  defaultArtistId INTEGER DEFAULT -1,
  isNumbered BOOLEAN NOT NULL DEFAULT 0,
  displayTips BOOLEAN NOT NULL DEFAULT 1,
  FOREIGN KEY (defaultArtistId) REFERENCES Artists(artistId)
);

INSERT OR IGNORE INTO Settings (id) VALUES (1);
`;

const createArtistsTable =
  'CREATE TABLE IF NOT EXISTS Artists (artistId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)';

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version',
  );
  let currentDbVersion = result.user_version;

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log('Database is up to date. No migration needed.');
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(
      `PRAGMA journal_mode = 'wal';` +
        createSongsTable +
        createTakesTable +
        createPageTable +
        createSettingsTable +
        createArtistsTable,
    );

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
