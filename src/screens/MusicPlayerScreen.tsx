import React, { useMemo, useState } from 'react';
import { View, Text, Button } from 'react-native';
import {
  SectionsWheelPicker,
  WheelPicker,
  WheelPickerAlign,
  WheelPickerProps,
} from 'react-native-ui-lib';

import useGlobalStyles from '@src/styles/global';
import {
  ROOT_NOTES,
  CHORD_EXTENSIONS,
  TIME_SIGNATURES,
} from '@src/common/enums';
import ChordWheelModal from '@src/lyrics/components/ChordWheelModal';

const MusicPlayerScreen = () => {
  const globalStyles = useGlobalStyles();

  const [isWheelOpen, setIsWheelOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setIsWheelOpen(true)} title={'Open the wheel'} />
      <ChordWheelModal
        isWheelOpen={isWheelOpen}
        setIsWheelOpen={setIsWheelOpen}
      />
    </View>
  );
};

export default MusicPlayerScreen;
