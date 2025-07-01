import React from 'react';
import { Linking, TouchableOpacity, Alert } from 'react-native';
import { modelName, osVersion, osName } from 'expo-device';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import BugIcon from '@src/icons/BugIcon';
import { APP_VERSION, SUPPORT_EMAIL } from '@src/components/common/constants';

const handleBugReporting = async () => {
  const SUBJECT = 'Bug Report';
  const BUG_EMAIL_BODY = `
Hello,

I encountered the following issue:

1. Steps to reproduce:
   -

2. Expected behavior:
   - What should happen

3. Actual behavior:
   - What actually happened

Additional details:\n`;

  const deviceInfo = `  - Device: ${modelName}
  - OS: ${osName} ${osVersion}
  - App Version: ${APP_VERSION}

Thank you!`;

  const deviceInfoFallback = `  - Device:
  - App Version: ${APP_VERSION}

Thank you!`;

  const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BUG_EMAIL_BODY + deviceInfo)}`;

  const mailtoUrlFallback = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BUG_EMAIL_BODY + deviceInfoFallback)}`;

  try {
    const supported = await Linking.canOpenURL(mailtoUrl);
    if (supported) {
      await Linking.openURL(mailtoUrl);
    } else {
      await Linking.openURL(mailtoUrlFallback);
    }
  } catch {
    Alert.alert(
      'Error',
      'An error occurred while trying to open the email client.',
    );
  }
};

const ReportABug = () => {
  const styles = useSettingsStyle();

  return (
    <TouchableOpacity
      onPress={handleBugReporting}
      style={styles.privacyPolicyContainer}
      hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
    >
      <StyledText style={styles.sectionTitle}>Report A Bug</StyledText>
      <BugIcon />
    </TouchableOpacity>
  );
};

export default ReportABug;
