import React, { useState } from 'react';
import { Text, View } from 'react-native';

import settingsStyle from '@styles/settings';

const About = ({}) => {

   return (
    <View>
      <Text style={settingsStyle.sectionTitle}>About</Text>
      <Text>This app was made by Sterling Muller. I don’t what a Terms of Service is so we’re probably fine. I hope you get a lot of good use out of my app, make killer songs, and spread the word to friends. Cheers, Sterling
            sterlingmuller93@gmail.com if you want to fight</Text>
    </View>
   );
};

export default About;