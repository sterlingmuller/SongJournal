import React from 'react';
import { Button, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import { backupSong } from '@src/data/utils/uploadToDropbox';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCloudConnection } from '@src/state/selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';

const CloudStorage = () => {
  const styles = useSettingsStyle();
  const cloudConnection = useAppSelector(selectCloudConnection);

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
    const pdfContent = await generateFileContent(lyricsFile);
    const takeOne = await generateFileContent(audioFileStarred);
    const takeTwo = await generateFileContent(audioFileTwo);

    const lyricsPdf = Buffer.from(pdfContent, 'base64');
    const takes = {
      'take2.mp3': Buffer.from(takeTwo, 'base64'),
    };
    const selectedSong = Buffer.from(takeOne, 'base64');

    await backupSong('Song Folder Example', lyricsPdf, takes, selectedSong);
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Cloud Storage</StyledText>
      {cloudConnection !== CloudConnection.NONE ? (
        <StyledText>
          You are connected to your
          <StyledText> {cloudConnection} </StyledText>
          account.
        </StyledText>
      ) : (
        <DropboxAuth />
      )}
      <Button title="Backup Song" onPress={handleBackup} color="red" />
    </View>
  );
};

export default CloudStorage;
