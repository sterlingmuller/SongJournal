import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import useSongFolderStyles from '@src/styles/songFolder';
import Slider from '@react-native-community/slider';
import { Take } from '@src/components/common/types';

interface Props {
  duration: number;
  // currentTime: number;
  // handleOnSeek: (value: number) => void;
}

const PlaybackBar = ({ duration }: Props) => {
  const styles = useSongFolderStyles();
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleOnSeek = (time: number) => {
    console.log('seeking to:', time);
  };

  useEffect(() => {
    setSliderValue(currentTime);
  }, [currentTime]);

  const handleSliderChange = (value: number) => setSliderValue(value);

  const handleSliderComplete = (value: number) => handleOnSeek(value);

  return (
    <View>
      <Slider
        maximumValue={duration}
        value={sliderValue}
        onValueChange={handleSliderChange}
        onSlidingComplete={handleSliderComplete}
      />
    </View>
  );
};

export default PlaybackBar;
