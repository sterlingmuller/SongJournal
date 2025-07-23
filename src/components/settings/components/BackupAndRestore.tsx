import React, { useState } from 'react';
import { View } from 'react-native';
import { reloadAsync } from 'expo-updates';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { createAndShareBackup } from '@src/utils/createAndShareBackup';
import { importBackup } from '@src/data/utils/importBackup';
import { useColorTheme } from '@src/state/context/ThemeContext';
import StyledButton from '@src/components/common/components/StyledButton';
import LoadingIndicator from '@src/components/common/components/LoadingIndicator';

const BackupAndRestore = () => {
  const styles = useSettingsStyle();
  const { theme } = useColorTheme();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const onExportPress = async () => {
    setIsExporting(true);
    try {
      await createAndShareBackup();
    } finally {
      setIsExporting(false);
    }
  };

  const onImportPress = async () => {
    setIsImporting(true);
    try {
      const didImport = await importBackup();
      if (didImport) {
        reloadAsync();
      }
    } finally {
      setIsImporting(false);
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
          <StyledButton
            label={isExporting ? 'Exporting...' : 'Export Backup'}
            onPress={onExportPress}
            backgroundColor={theme.settingsEmphasis}
            textColor={'white'}
            buttonsStyle={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
            disabled={isExporting || isImporting}
          />
          <StyledButton
            label={isImporting ? 'Importing...' : 'Import Backup'}
            onPress={onImportPress}
            backgroundColor={theme.primary}
            textColor={'white'}
            buttonsStyle={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
            disabled={isExporting || isImporting}
          />
        </View>
        {(isExporting || isImporting) && (
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <LoadingIndicator />
          </View>
        )}
      </View>
    </View>
  );
};

export default BackupAndRestore;
