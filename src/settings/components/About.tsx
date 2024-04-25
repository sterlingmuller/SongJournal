import React from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';

const About = () => (
  <View>
    <Text style={settingsStyle.sectionTitle}>About</Text>
    <View>
      <Text style={settingsStyle.about}>
        This app was made by Sterling Muller. I don’t know what a Terms of
        Service is so we’re probably fine. I hope you get a lot of good use out
        of my app, make killer songs, and spread the word to friends.
      </Text>
      <Text style={settingsStyle.aboutSignature}>Cheers,</Text>
      <Text style={settingsStyle.about}>Sterling</Text>
      <Text style={settingsStyle.aboutSignature}>
        sterlingmuller93@gmail.com if you want to fight
      </Text>
    </View>
  </View>
);

export default About;
