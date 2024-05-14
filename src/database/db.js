import * as SQLite from 'expo-sqlite/next';

const createSongsTable =
  'CREATE TABLE IF NOT EXISTS Songs (SongID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, SelectedTakeID INTEGER, FOREIGN KEY (SelectedTakeID) REFERENCES Takes(TakeID));';

const createTakesTable =
  'CREATE TABLE IF NOT EXISTS Takes (TakeID INTEGER PRIMARY KEY AUTOINCREMENT, SongID INTEGER NOT NULL, Title TEXT NOT NULL, Date TEXT NOT NULL, Notes TEXT, FOREIGN KEY (SongID) REFERENCES Songs(SongID));';

const createPageTable =
  'CREATE TABLE IF NOT EXISTS Page (SongID INTEGER PRIMARY KEY AUTOINCREMENT, Lyircs TEXT, FOREIGN KEY (SongID) REFERENCES Songs(SongID));';

const createInfoTable =
  'CREATE TABLE IF NOT EXISTS Info (SongID INTEGER PRIMARY KEY AUTOINCREMENT, BPM TEXT, KeySignature TEXT, Time TEXT, About TEXT, Completed BOOLEAN NOT NULL, FOREIGN KEY (SongID) REFERENCES Pages(SongID));';

const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('songjournal');

    await db.execAsync(
      createSongsTable + createTakesTable + createPageTable + createInfoTable,
    );

    console.log('Database and tables created or already exist.');
  } catch (err) {
    console.error('Error initializing the database: ', err);
  }
};

export default initDatabase;
