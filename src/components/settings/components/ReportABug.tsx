import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import BugIcon from '@src/icons/BugIcon';
import { SUPPORT_EMAIL } from '@src/components/common/constants';

const handleBugReporting = async () => {
  const SUBJECT = 'Bug Report';
  const BUG_EMAIL_BODY = `
Hello,

I encountered the following issue:

1. Steps to reproduce:
   - Step 1
   - Step 2

2. Expected behavior:
   - What should happen

3. Actual behavior:
   - What actually happened

Additional details:
- Device: [Your device model]
- OS: [Your OS version]
- App Version: [Your app version]

Thank you!
    `;

  const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BUG_EMAIL_BODY)}`;

  try {
    const supported = await Linking.canOpenURL(mailtoUrl);
    if (supported) {
      await Linking.openURL(mailtoUrl);
    } else {
      Alert.alert(
        'Email Not Supported',
        'Your device does not support opening the email client.',
      );
    }
  } catch (error) {
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
      hitSlop={20}
    >
      <StyledText style={styles.sectionTitle}>Report A Bug</StyledText>
      <BugIcon />
    </TouchableOpacity>
  );
};

export default ReportABug;
