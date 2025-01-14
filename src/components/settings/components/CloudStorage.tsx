import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import { createBackup } from '@src/utils/createAndShareBackup';
import { uploadFileToDropbox } from '@src/data/utils/uploadToDropbox';
import { clearTokens } from '@src/data/utils/tokenStorage';

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
import useCloudStorageStyle from '@src/styles/cloudStorage';
import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { useColorTheme } from '@src/state/context/ThemeContext';
import SettingsToggle from '../subcomponents/SettingsToggle';
import Separator from '@src/components/common/components/Separator';

const CloudStorage = () => {
  const { theme } = useColorTheme();
  const styles = useCloudStorageStyle();
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
      {/* <Button title="Backup Song" onPress={handleBackup} color="red" /> */}
      <StyledText>
        Tip: Sync Backup will upload a zip file of all your app files and data
        to your cloud storage. This file can be imported to restore your data in
        case of data loss.
      </StyledText>
      <View style={{ ...styles.buttons }}>
        <View style={styles.button}>
          <Button
            title={'Sync Backup'}
            onPress={handleAppBackup}
            color={theme.settingsEmphasis}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'Disconnect'}
            color={theme.error}
            onPress={handleDisconnect}
          />
        </View>
      </View>
      <StyledText style={styles.sectionTitle}>Sync Settings</StyledText>
      <StyledText>
        Tip: Enabling Auto Sync will immediately upload the Lyrics and Starred
        Take for each Song. New Songs will be uploaded when created. You can
        enable additional sync settings below, before enabling auto sync.
      </StyledText>
      <View style={styles.togglesContainer}>
        <SettingsToggle
          label="Sync unstarred Takes"
          isActive={false}
          onToggle={() => {}}
        />
        <Separator />
        <SettingsToggle
          label="Sync only Completed Songs"
          isActive={false}
          onToggle={() => {}}
        />
        <Separator />
        <SettingsToggle
          label="Auto Sync"
          isActive={false}
          onToggle={() => {}}
        />
      </View>
    </View>
  );
};

export default CloudStorage;
