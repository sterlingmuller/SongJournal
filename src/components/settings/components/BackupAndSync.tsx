import React, { useState } from 'react';
import { Button, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import { backupSong } from '@src/data/utils/uploadToDropbox';
import { DropboxUploadTest } from './DropBoxUploadTest';

const BackupAndSync = () => {
  const styles = useSettingsStyle();
  const [isConnected, setIsConnected] = useState(false);

  const audioFileStarred =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Audio/recording-9f471474-6472-4b3f-bf2a-05d2a2d738e8.m4a';

  const audioFileTwo =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Audio/recording-bcd35395-8284-47e8-a61a-1e16f666d51d.m4a';

  const lyricsFile =
    'file:///data/user/0/com.sterling.silverado.songjournal/cache/Print/adeae47c-74ea-48f3-9c31-d8b622d06430.pdf';

  const generateFileContent = async (filePath: string) => {
    const fileContent = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileContent;
  };

  const handleBackup = async () => {
    console.log('hi');
    const pdfContent = await generateFileContent(lyricsFile);
    const takeOne = await generateFileContent(audioFileStarred);
    const takeTwo = await generateFileContent(audioFileTwo);

    console.log('woof');

    // const lyricsHtml = Buffer.from('<html>Lyrics</html>', 'utf-8');
    const lyricsPdf = Buffer.from(pdfContent, 'base64'); // Replace with actual PDF content
    const takes = {
      'take2.mp3': Buffer.from(takeTwo, 'base64'), // Replace with actual take content
    };
    const selectedSong = Buffer.from(takeOne, 'base64'); // Replace with actual song content

    console.log('hrm');

    await backupSong(
      'Song Folder Example',
      // lyricsHtml,
      lyricsPdf,
      takes,
      selectedSong,
    );

    console.log('done');
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Back up & Sync</StyledText>
      {isConnected ? (
        <StyledText>
          Backing up to
          <StyledText> sterlingmuller93@gmail.com</StyledText>
        </StyledText>
      ) : (
        <DropboxAuth />
      )}
      <Button title="Backup Song" onPress={handleBackup} color="red" />
      {/* <DropboxUploadTest /> */}
    </View>
  );
};

export default BackupAndSync;
