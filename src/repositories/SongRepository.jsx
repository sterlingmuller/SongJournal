import { useSQLiteContext } from 'expo-sqlite';

export const florb = 2;

class SongRepository {
  static addSong(title) {
    const db = useSQLiteContext();

    const test = async () => {
      console.log('title:', title);
      console.log('db: ', db);

      // const result = db.execSync(
      //   'INSERT INTO Songs (title) VALUES (?)',
      //   'blorp',
      // );

      const statement = await db.prepareAsync(
        'INSERT INTO songs (title) VALUES (?)',
      );

      try {
        const result = statement.executeAsync([title]);
        console.log('test: ', result);
      } finally {
        statement.finalizeAsync();
      }
    };
    const florb = 2;
    console.log('vtbrtr');
    test();
  }

  // static getAllSongs() {
  //   const db = getDatabaseConnection();

  //   return async () => {
  //     const statement = await db.prepareAsync('SELECT * FROM songs');

  //     try {
  //       const result = statement.allAsync();
  //       console.log(result);
  //       console.log('get all songs: ', result);
  //     } finally {
  //       statement.finalizeAsync();
  //     }
  //   };
  // }
}

export default SongRepository;
