import React, { useState } from 'react';
import { View } from 'react-native';
import { WheelPicker, WheelPickerAlign } from 'react-native-ui-lib';
import Modal from 'react-native-modal';

import { TIME_SIGNATURES } from '@src/components/common/constants';
import { SongDetailKey } from '@src/components/common/enums';
import useWheelPickerModalStyles from '@src/styles/wheelPickerModal';
import StyledText from '@src/components/common/components/StyledText';
import { SongInfo } from '@src/components/common/types';

interface Props {
  isWheelOpen: boolean;
  setIsWheelOpen: (value: boolean) => void;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
  initialValue: string;
}

const TimeSignatureWheelModal = (props: Props) => {
  const { isWheelOpen, setIsWheelOpen, handleInputChange, initialValue } =
    props;
  const styles = useWheelPickerModalStyles();

  const [timeSignature, setTimeSignature] = useState('');

  const onExitPress = () => {
    setIsWheelOpen(false);
    handleInputChange(SongDetailKey.TIME, timeSignature);
  };

  return (
    <Modal
      isVisible={isWheelOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>Time Signature</StyledText>
        <View style={styles.line} />
        <WheelPicker
          items={TIME_SIGNATURES}
          textStyle={styles.wheelText}
          onChange={(item: string) => setTimeSignature(item)}
          align={WheelPickerAlign.CENTER}
          style={styles.timeSection}
          faderProps={{ size: 0 }}
          initialValue={initialValue}
        />
      </View>
    </Modal>
  );
};

export default TimeSignatureWheelModal;
