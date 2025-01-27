import React from 'react';
import { Button, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

import { createBackup } from '@src/utils/createAndShareBackup';
import { uploadFileToDropbox } from '@dropbox/helpers/uploadToDropbox';
import { clearTokens } from '@src/data/utils/tokenStorage';

import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { CloudConnection } from '@src/components/common/enums';
import { useSQLiteContext } from 'expo-sqlite';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import { useNetworkStatus } from '@src/state/context/NetworkContext';

interface Props {
  cloudConnection: CloudConnection;
}

const CloudStorage = ({ cloudConnection }: Props) => {
  const { theme } = useColorTheme();
  const styles = useCloudStorageStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const displayTips = useAppSelector(selectDisplayTips);

  const { isOnline, setIsOnline } = useNetworkStatus();

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
      <StyledText
        style={styles.sectionTitle}
      >{`Is Online: ${isOnline}`}</StyledText>
      <Button
        title={'Toggle isOnline'}
        onPress={() => setIsOnline(!isOnline)}
        color={theme.settingsEmphasis}
      />
      {cloudConnection !== CloudConnection.NONE ? (
        <View>
          <StyledText>
            You are connected to your
            <StyledText> {cloudConnection} </StyledText>
            account. You may adjust settings and enable Auto Syncing below.
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
          {displayTips && (
            <StyledText style={styles.tipText}>
              Tip: Sync Backup will upload a zip file of all your app files and
              data to your cloud storage. This file can be imported below to
              restore your data in case of data loss.
            </StyledText>
          )}
        </View>
      ) : (
        <DropboxAuth />
      )}
    </View>
  );
};

export default CloudStorage;
