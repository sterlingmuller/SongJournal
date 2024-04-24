import React, { useState } from 'react';
import { View, Text } from 'react-native';

const MusicPlayerScreen = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View>
      <Text>Music Player Screen</Text>
    </View>
  );
};

export default MusicPlayerScreen;
