import * as FileSystem from 'expo-file-system';
import { zip } from 'react-native-zip-archive';

import {
  AUDIO_DIR,
  BACKUP_DIR,
  DB_NAME,
  DB_PATH,
} from '@src/components/common/constants';
import { shareZip } from './shareHelpers';

const BATCH_SIZE = 10;

const copyAudioFilesBatch = async (audioFiles: string[], startIdx: number) => {
  const batch = audioFiles.slice(startIdx, startIdx + BATCH_SIZE);
  await Promise.all(
    batch.map(file =>
      FileSystem.copyAsync({
        from: `${AUDIO_DIR}${file}`,
        to: `${BACKUP_DIR}Audio/${file}`,
      })
    )
  );
};

export const createBackup = async () => {
  try {
    await FileSystem.makeDirectoryAsync(BACKUP_DIR, { intermediates: true });

    await FileSystem.copyAsync({
      from: DB_PATH,
      to: `${BACKUP_DIR}${DB_NAME}`,
    });

    const audioDirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);

    if (audioDirInfo.exists && audioDirInfo.isDirectory) {
      const audioFiles = await FileSystem.readDirectoryAsync(AUDIO_DIR);
      if (audioFiles.length > 0) {
        await FileSystem.makeDirectoryAsync(`${BACKUP_DIR}Audio`, {
          intermediates: true,
        });

        for (let i = 0; i < audioFiles.length; i += BATCH_SIZE) {
          await copyAudioFilesBatch(audioFiles, i);
        }
      }
    }

    const zipPath = `${FileSystem.cacheDirectory}songjournal_backup.zip`;
    await zip(BACKUP_DIR, zipPath);

    await FileSystem.deleteAsync(BACKUP_DIR, { idempotent: true });

    return zipPath;
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw new Error('Backup creation failed');
  }
};

export const createAndShareBackup = async () => {
  const zipPath = await createBackup();
  shareZip(zipPath);
};
