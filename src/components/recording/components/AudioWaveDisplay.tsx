import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import WaveBar from '@src/components/recording/subcomponents/WaveBar';
import MaskedView from '@react-native-masked-view/masked-view';

interface Props {
  isRecording: boolean;
  wave: number[];
}

const AudioWaveDisplay = (props: Props) => {
  const { isRecording, wave } = props;
  const styles = useAudioWaveStyles();

  const MOCK_FULL_WAVE = [
    30, 30, 30, 30, 30, 75, 75, 74, 74, 73, 76, 65, 67, 66, 77, 76, 73, 78, 83,
    76, 84, 86, 74, 56, 65, 67, 75, 73, 87, 76, 78, 65, 65, 67, 67, 76, 75, 73,
    74, 74, 73, 72, 75, 75, 83, 82, 81, 80, 78, 75, 79, 77, 76, 77, 77,
  ];

  const maskedElement = (
    <View style={styles.waveContent}>
      {MOCK_FULL_WAVE.map((waveHeight: number, index: number) => (
        <WaveBar
          key={index}
          waveHeight={waveHeight}
          index={index}
          isRecording={isRecording}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.waveContainer}>
      <MaskedView style={{ flex: 1, top: '43%' }} maskElement={maskedElement}>
        <View
          style={{
            flex: 1,
            zIndex: 1,
            width: '20%',
            backgroundColor: '#ff4081',
            position: 'absolute',
            top: 0,
            bottom: 0,
          }}
        />
        <View style={{ flex: 1, backgroundColor: '#3f51b5' }} />
      </MaskedView>
      {!isRecording && <View style={styles.midpointLine} />}
    </View>
  );
};

export default AudioWaveDisplay;
