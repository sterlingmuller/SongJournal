import React from 'react';
import { View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';

const About = () => {
  const styles = useSettingsStyle();

  return (
    <View>
      <StyledText style={styles.sectionTitle}>About</StyledText>
      <View>
        <StyledText style={styles.about}>
          This app was made by Sterling Muller. I don’t know what a Terms of
          Service is so we’re probably fine. I hope you get a lot of good use
          out of my app, make killer songs, and spread the word to friends.
        </StyledText>
        <StyledText style={styles.aboutSignature}>Cheers,</StyledText>
        <StyledText style={styles.about}>Sterling</StyledText>
        <StyledText style={styles.aboutSignature}>
          sterlingmuller93@gmail.com
        </StyledText>
      </View>
    </View>
  );
};

export default About;
