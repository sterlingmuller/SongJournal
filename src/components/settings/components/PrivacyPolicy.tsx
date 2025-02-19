import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import LinkIcon from '@src/icons/LinkIcon';

const PrivacyPolicy = () => {
  const styles = useSettingsStyle();
  const handlePress = () => {
    const url = 'https://sites.google.com/view/songjournalprivacy';
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.privacyPolicyContainer}
      hitSlop={20}
    >
      <StyledText style={styles.sectionTitle}>Privacy Policy</StyledText>
      <LinkIcon />
    </TouchableOpacity>
  );
};

export default PrivacyPolicy;
