import React from 'react';
import { View, Alert } from 'react-native';

import { clearTokens } from '@src/data/utils/tokenStorage';
import StyledText from '@src/components/common/components/StyledText';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { CloudConnection } from '@src/components/common/enums';
import { useSQLiteContext } from 'expo-sqlite';
import useCloudStorageStyle from '@src/styles/cloudStorage';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import useDropboxFileGenerator from '@src/services/cloudStorage/dropbox/hooks/useDropboxFileGenerator';
import StyledButton from '@src/components/common/components/StyledButton';

interface Props {
  cloudConnection: CloudConnection;
}

const CloudStorage = ({ cloudConnection }: Props) => {
  const { theme } = useColorTheme();
  const styles = useCloudStorageStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const displayTips = useAppSelector(selectDisplayTips);
  const { generateAndUploadZipBuffer } = useDropboxFileGenerator();

  // online toggle for use in development testing
  // const { isOnline } = useNetworkStatus();

  const handleAppBackup = async () => {
    generateAndUploadZipBuffer();
  };

  const handleDisconnect = async () => {
    await clearTokens();
    dispatch(
      updateSettingsRequest({
        db,
        updatedSettings: { cloudConnection: CloudConnection.NONE },
      })
    );
    Alert.alert(
      'Disconnected',
      'You have been disconnected from the cloud service.'
    );
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Cloud Storage</StyledText>
      {/* <StyledText
        style={styles.sectionTitle}
      >{`Is Online: ${isOnline}`}</StyledText>
      <Button
        title={'Toggle isOnline'}
        onPress={() => setIsOnline(!isOnline)}
        color={theme.settingsEmphasis}
      /> */}
      {cloudConnection !== CloudConnection.NONE ? (
        <View>
          <StyledText>
            You are connected to your
            <StyledText style={styles.boldText}> {cloudConnection} </StyledText>
            account. You may adjust settings and enable Auto Syncing below.
          </StyledText>
          <View style={{ ...styles.buttons }}>
            <View style={styles.button}>
              <StyledButton
                label={'Disconnect'}
                backgroundColor={theme.error}
                onPress={handleDisconnect}
                textColor={'white'}
                buttonsStyle={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
              />
            </View>
            <View style={styles.button}>
              <StyledButton
                label={'Sync Backup'}
                onPress={handleAppBackup}
                backgroundColor={theme.settingsEmphasis}
                textColor={'white'}
                buttonsStyle={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
              />
            </View>
          </View>
          {displayTips && (
            <StyledText style={styles.tipText}>
              Tip:{' '}
              <StyledText style={[styles.tipText, styles.boldText]}>
                Sync Backup
              </StyledText>{' '}
              will upload a zip file of all your app files and data to your
              cloud storage. This file can be imported below to restore your
              data.
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
