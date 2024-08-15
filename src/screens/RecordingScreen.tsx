import React, { useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/recording/components/Timer';
import RecordingControls from '@src/recording/components/RecordingControls';

const RecordingScreen = () => {
  const styles = useRecordingStyles();

  const [uri, setUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Timer duration={duration} />
      <RecordingControls
        duration={duration}
        setDuration={setDuration}
        uri={uri}
        setUri={setUri}
      />
    </View>
  );
};

export default RecordingScreen;
