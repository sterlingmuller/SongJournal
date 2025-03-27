import React from 'react';
import { Button, View } from 'react-native';
import { reloadAsync } from 'expo-updates';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { createAndShareBackup } from '@src/utils/createAndShareBackup';
import { importBackup } from '@src/data/utils/importBackup';
import { useColorTheme } from '@src/state/context/ThemeContext';

const BackupAndRestore = () => {
  const styles = useSettingsStyle();
  const { theme } = useColorTheme();

  const onExportPress = () => createAndShareBackup();
  const onImportPress = async () => {
    const didImport = await importBackup();
    if (didImport) {
      reloadAsync();
    }
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Backup & Restore</StyledText>
      <View>
        <StyledText style={styles.about}>
          Backup your data to keep it safe or transfer it to another device. You
          can restore your data from a backup file at any time.
        </StyledText>
        <View style={styles.backupButtons}>
          <View style={styles.button}>
            <Button
              title="Export Backup"
              onPress={onExportPress}
              color={theme.settingsEmphasis}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Import Backup"
              onPress={onImportPress}
              color={theme.primary}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BackupAndRestore;
