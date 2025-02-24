import React from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import PlaybackDuration from '@src/components/home/subcomponents/PlaybackDuration';
import usePlaybackBarStyles from '@src/styles/playbackBar';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  duration: number;
  fromSongTakes?: boolean;
}

const PlaybackBar = ({ duration, fromSongTakes }: Props) => {
  const styles = usePlaybackBarStyles();
  const { currentTime, seekTo } = useAudioPlayer();
  const { theme } = useColorTheme();

  const min = useSharedValue(0);
  const max = useSharedValue(duration);

  const handleOnValueChange = (time: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    seekTo(time);
  };

  return (
    <View style={fromSongTakes ? styles.takesContainer : styles.container}>
      <View
        style={
          fromSongTakes ? styles.takesSliderContainer : styles.sliderContainer
        }
      >
        <Slider
          containerStyle={{ borderRadius: 8 }}
          renderBubble={() => null}
          progress={currentTime}
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
        />
      </View>
      <PlaybackDuration />
    </View>
  );
};

export default React.memo(PlaybackBar);
