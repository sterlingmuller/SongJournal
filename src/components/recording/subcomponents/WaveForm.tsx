import React from 'react';
import { FlexAlignType, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import { WAVE_BAR_TOTAL_WIDTH } from '@src/components/common/constants';

interface BarProps {
  waveHeight: number;
  isOverlay?: boolean;
}

const Bar = React.memo(({ waveHeight, isOverlay = false }: BarProps) => {
  const styles = useAudioWaveStyles();

  return (
    <View style={styles.waveColumn}>
      <View style={styles.topWaveContainer}>
        {waveHeight < 5 ? (
          <View style={isOverlay ? styles.overlayDot : styles.dot} />
        ) : (
          <View style={styles.getDynamicStyles(waveHeight, isOverlay, false)} />
        )}
      </View>
      <View style={styles.bottomWaveContainer}>
        {waveHeight < 5 ? (
          <View
            style={isOverlay ? styles.overlayBottomDot : styles.bottomDot}
          />
        ) : (
          <View style={styles.getDynamicStyles(waveHeight, isOverlay, true)} />
        )}
      </View>
    </View>
  );
});

interface WaveFormProps {
  waveForm: number[];
  progress?: SharedValue<number>;
  actualWaveWidth?: number;
}

const WaveForms = ({
  waveForm,
  progress = null,
  actualWaveWidth,
}: WaveFormProps) => {
  const styles = useAudioWaveStyles();

  const containerStyle = actualWaveWidth
    ? {
        width: actualWaveWidth,
        alignSelf: 'center' as FlexAlignType,
      }
    : null;

  const playedAnimatedStyle = progress
    ? useAnimatedStyle(() => {
        const width = actualWaveWidth
          ? progress.value * actualWaveWidth
          : progress.value * (waveForm.length * WAVE_BAR_TOTAL_WIDTH);

        return {
          width,
        };
      })
    : undefined;

  return (
    <View style={[styles.waveformContainer, containerStyle]}>
      {waveForm.map((waveHeight: number, index: number) => (
        <Bar key={index} waveHeight={waveHeight} />
      ))}
      {progress && (
        <Animated.View style={[styles.progressOverlay, playedAnimatedStyle]}>
          {waveForm.map((waveHeight: number, index: number) => (
            <Bar
              key={`overlay-${index}`}
              waveHeight={waveHeight}
              isOverlay={true}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default React.memo(WaveForms);
