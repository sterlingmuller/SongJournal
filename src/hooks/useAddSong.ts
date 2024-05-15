import { useSQLiteContext } from 'expo-sqlite';

export const useAddSong = async (db, title: string) => {
  console.log('yip');
  console.log('bdfp');
  const statement = await db.prepareAsync(
    'INSERT INTO Songs (title) VALUES (?)',
  );

  console.log('nb');

  statement.executeAsync([title]);
  const result = await db.getAllAsync('SELECT * FROM Songs');

  console.log('hrm: ', result);

  statement.finalizeAsync();

  console.log('vtbrtr');
};

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
