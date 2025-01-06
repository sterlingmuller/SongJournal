import React, { useState } from 'react';
import { Button, View } from 'react-native';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import { backupSong } from '@src/data/utils/uploadToDropbox';
import { DropboxUploadTest } from './DropBoxUploadTest';

const BackupAndSync = () => {
  const styles = useSettingsStyle();
  const [isConnected, setIsConnected] = useState(false);

  const handleBackup = async () => {
    const lyricsHtml = Buffer.from('<html>Lyrics</html>', 'utf-8');
    const lyricsPdf = Buffer.from('PDF content', 'utf-8'); // Replace with actual PDF content
    const takes = {
      'take1.mp3': Buffer.from('Take 1 content', 'utf-8'), // Replace with actual take content
      'take2.mp3': Buffer.from('Take 2 content', 'utf-8'), // Replace with actual take content
    };
    const selectedSong = Buffer.from('Selected song content', 'utf-8'); // Replace with actual song content

    await backupSong('SongTitle1', lyricsHtml, lyricsPdf, takes, selectedSong);
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
      <DropboxUploadTest />
    </View>
  );
};

export default BackupAndSync;
