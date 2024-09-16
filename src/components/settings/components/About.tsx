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
          This app was made by Sterling Muller. It is still in development and
          there are a lot of features I'm excited to add. If you notice any
          bugs, have any requests, or wish to reach out for whatever reason,
          send me an email! I hope you get a lot of use out of my app, make
          killer songs, and spread the word to friends.
        </StyledText>
        <StyledText style={styles.aboutSignature}>Cheers,</StyledText>
        <StyledText style={styles.about}>Sterling</StyledText>
        <StyledText style={styles.aboutSignature}>
          SongJournalApp@gmail.com
        </StyledText>
      </View>
    </View>
  );
};

export default About;
