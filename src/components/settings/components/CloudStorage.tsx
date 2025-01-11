import React from 'react';
import { Button, TouchableOpacity, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import { createBackup } from '@src/utils/createAndShareBackup';
import { uploadFileToDropbox } from '@src/data/utils/uploadToDropbox';
import {
  clearTokens,
  getAccessToken,
  getAccessTokenExpiry,
  getRefreshToken,
} from '@src/data/utils/tokenStorage';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import { backupSong } from '@src/data/utils/uploadToDropbox';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCloudConnection } from '@src/state/selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';
import SettingIcon from '@src/icons/SettingIcon';

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

  const handleAppBackup = async () => {
    const zipPath = await createBackup();

    const zipContent = await FileSystem.readAsStringAsync(zipPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const zipBuffer = Buffer.from(zipContent, 'base64');
    await uploadFileToDropbox('songjournal_backup.zip', zipBuffer);

    await FileSystem.deleteAsync(zipPath, { idempotent: true });
  };

  const handleDisconnect = async () => {
    await clearTokens();
    Alert.alert(
      'Disconnected',
      'You have been disconnected from the cloud service.',
    );
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
      <TouchableOpacity onPress={() => {}}>
        <SettingIcon />
        <StyledText>Sync Settings</StyledText>
      </TouchableOpacity>
      <Button title="Backup Song" onPress={handleBackup} color="red" />
      <Button title="Disconnect" onPress={handleDisconnect} color="blue" />
      <Button title="Sync App Backup" onPress={handleAppBackup} color="green" />
    </View>
  );
};

export default CloudStorage;
