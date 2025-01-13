import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import { createBackup } from '@src/utils/createAndShareBackup';
import { uploadFileToDropbox } from '@src/data/utils/uploadToDropbox';
import { clearTokens } from '@src/data/utils/tokenStorage';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { selectCloudConnection } from '@src/state/selectors/settingsSelector';
import { CloudConnection } from '@src/components/common/enums';
import SettingIcon from '@src/icons/SettingIcon';
import { useSQLiteContext } from 'expo-sqlite';
import useDropboxSongFolderGenerator from '@src/data/utils/useDropboxFileGenerator';

const CloudStorage = () => {
  const styles = useSettingsStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const cloudConnection = useAppSelector(selectCloudConnection);

  const triggerBackup = useDropboxSongFolderGenerator();

  const handleBackup = () => {
    triggerBackup();
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
    dispatch(
      updateSettingsRequest({
        db,
        updatedSettings: { cloudConnection: CloudConnection.NONE },
      }),
    );
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
