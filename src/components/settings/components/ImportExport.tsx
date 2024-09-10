import React from 'react';
import { Button, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import createAndShareBackup from '@src/utils/createAndShareBackup';
import { importBackup } from '@src/utils/importBackup';

const ImportExport = () => {
  const styles = useSettingsStyle();

  const onExportPress = () => createAndShareBackup();
  const onImportPress = () => importBackup();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Import / Export</StyledText>
      <View>
        <StyledText style={styles.about}>
          How to backup your files and transfer to another device:
        </StyledText>
        <StyledText style={styles.aboutSignature}>
          {'1) Export files'}
        </StyledText>
        <View style={styles.button}>
          <Button title="Export" onPress={onExportPress} color="teal" />
        </View>
        <StyledText style={styles.about}>{'2) Import'}</StyledText>
        <View style={styles.button}>
          <Button title="Import" onPress={onImportPress} color="orange" />
        </View>
      </View>
    </View>
  );
};

export default ImportExport;
