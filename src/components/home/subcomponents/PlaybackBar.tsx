import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import PlaybackDuration from '@src/components/home/subcomponents/PlaybackDuration';
import usePlaybackBarStyles from '@src/styles/playbackBar';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { useColorTheme } from '@src/state/context/ThemeContext';
import usePlaybackTimer from '@src/hooks/usePlaybackTimer';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import { calculateHitSlop } from '@src/utils/calculateHitSlope';
import { MIN_TOUCH_SIZE } from '@src/components/common/constants';

interface Props {
  duration: number;
  fromSongTakes?: boolean;
}

const PlaybackBar = ({ duration, fromSongTakes }: Props) => {
  const styles = usePlaybackBarStyles();
  const { seekTo, soundRef } = useAudioPlayer();
  const isPlaying = useAppSelector(selectIsPlaying);
  const { theme } = useColorTheme();

  const currentTime = usePlaybackTimer(soundRef, isPlaying);

  const progress = useSharedValue(currentTime);
  const min = useSharedValue(0);
  const max = useSharedValue(duration);

  useEffect(() => {
    progress.set(currentTime);
  }, [currentTime]);

  const handleOnValueChange = (time: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    seekTo(time);
  };

  return (
    <View style={fromSongTakes ? styles.takesContainer : styles.container}>
      <TouchableWithoutFeedback onPressIn={(e) => e.stopPropagation()}>
        <View
          style={
            fromSongTakes ? styles.takesSliderContainer : styles.sliderContainer
          }
        >
          <Slider
            containerStyle={{ borderRadius: 8 }}
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            onSlidingStart={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onSlidingComplete={handleOnValueChange}
            thumbWidth={25}
            theme={{
              minimumTrackTintColor: theme.primary,
              maximumTrackTintColor: theme.secondary,
              heartbeatColor: theme.highlight,
            }}
            sliderHeight={15}
            heartbeat
            panHitSlop={calculateHitSlop({width: MIN_TOUCH_SIZE, height: 15})}
          />
        </View>
      </TouchableWithoutFeedback>
      <PlaybackDuration currentTime={currentTime} />
    </View>
  );
};

export default React.memo(PlaybackBar);
