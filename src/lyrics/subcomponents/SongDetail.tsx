import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import useSongDetailStyles from '@src/styles/songDetail';
import { SongInfo } from '@src/common/types';
import { KEY_SIGNATURES } from '@src/common/enums';

interface Props {
  detailKey: string;
  label: string;
  value: string;
  onPageScreen?: boolean;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
}

const SongDetail = (props: Props) => {
  const { detailKey, label, value, onPageScreen, handleInputChange } = props;
  const styles = useSongDetailStyles();

  const isKey = label === 'Key';
  const isTime = label === 'Time';
  console.log('value:', value);

  const renderInput =
    isKey || isTime ? (
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          value={value}
          onValueChange={(text: string) =>
            handleInputChange(detailKey as keyof SongInfo, text)
          }
          items={KEY_SIGNATURES}
          style={{
            inputAndroid: styles.select,
          }}
          placeholder={'wee'}
          // ... your styles for the RNPickerSelect component
        />
      </View>
    ) : (
      <TextInput
        style={onPageScreen ? styles.pageTextbox : styles.textbox}
        value={value}
        onChangeText={(text: string) =>
          handleInputChange(detailKey as keyof SongInfo, text)
        }
        textAlign="center"
      />
    );

  return (
    <View style={onPageScreen ? styles.pageContainer : styles.container}>
      {renderInput}
      <Text>{label}</Text>
    </View>
  );
};

export default SongDetail;
