import React, { useState } from 'react';
import { View } from 'react-native';

import useSettingsStyle from '@src/styles/settings';
import StyledText from '@src/components/common/components/StyledText';
import { configureGoogleSignIn } from '@src/utils/googleSignInConfig';
import DropboxAuth from '@src/components/settings/components/DropboxAuth';

const BackupAndSync = () => {
  const styles = useSettingsStyle();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Back up & Sync</StyledText>
      {isConnected ? (
        <StyledText>
          Backing up to
          <StyledText> sterlingmuller93@gmail.com</StyledText>
        </StyledText>
      ) : (
        <DropboxAuth />
      )}
    </View>
  );
};

export default BackupAndSync;
