import React from 'react';
import { View } from 'react-native';

import useSettingsStyle from '@styles/settings';
import StyledText from '@src/common/components/StyledText';

const BackupAndSync = () => {
  const styles = useSettingsStyle();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Back up & Sync</StyledText>
      <StyledText>
        Backing up to
        <StyledText> sterlingmuller93@gmail.com</StyledText>
      </StyledText>
    </View>
  );
};

export default BackupAndSync;
