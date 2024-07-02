import React from 'react';
import { View, Text } from 'react-native';
import { SectionsWheelPicker } from 'react-native-ui-lib';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import { KEY_SIGNATURES, TIME_SIGNATURES } from '@src/common/enums';

interface Props {
  detailKey: string;
  label: string;
  value: string;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetailSelect = (props: Props) => {
  const { detailKey, label, value, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const selectOptions =
    detailKey === 'keySignature' ? KEY_SIGNATURES : TIME_SIGNATURES;

  console.log('value:', value);

  return (
    <View style={styles.container}>
      {/* <View style={styles.pickerContainer}> */}
      <SectionsWheelPicker />
      {/* </View> */}
      {/* <Picker
        selectedValue={'hrm'}
        style={styles.select}
        onValueChange={(itemValue: string) =>
          handleInputChange(detailKey, itemValue)
        }
      >
        {selectOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker> */}
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetailSelect;
