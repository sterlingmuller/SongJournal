import React, { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import {
  SectionsWheelPicker,
  WheelPicker,
  WheelPickerAlign,
  WheelPickerProps,
} from 'react-native-ui-lib';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import {
  ROOT_NOTES,
  CHORD_EXTENSIONS,
  TIME_SIGNATURES,
} from '@src/common/enums';

interface Props {
  detailKey: string;
  label: string;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { detailKey, label, value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const [rootNote, setRootNote] = useState('');
  const [chordExtension, setChordExtension] = useState('');

  // const selectOptions =
  //   detailKey === 'keySignature' ? KEY_SIGNATURES : TIME_SIGNATURES;

  console.log('value:', value);

  const sections: WheelPickerProps<string | number>[] = useMemo(() => {
    return [
      {
        items: ROOT_NOTES,
        onChange: (item: string) => setRootNote(item),
        initialValue: rootNote,
        label: 'Root Note',
        align: WheelPickerAlign.RIGHT,
        style: {
          flex: 1,
          flexDirection: 'row-reverse',
        },
      },
      {
        items: CHORD_EXTENSIONS,
        onChange: (item: string) => setChordExtension(item),
        initialValue: chordExtension,
        label: 'Extension',
        align: WheelPickerAlign.RIGHT,
        style: {
          flex: 1,
          flexDirection: 'row',
        },
      },
    ];
  }, [setRootNote, setChordExtension]);

  return (
    <View style={styles.container}>
      <SectionsWheelPicker numberOfVisibleRows={2} sections={sections} />
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetailSelect;
