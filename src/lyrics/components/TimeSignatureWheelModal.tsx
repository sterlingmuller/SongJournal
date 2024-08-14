import React, { useState } from 'react';
import { View } from 'react-native';
import { WheelPicker, WheelPickerAlign } from 'react-native-ui-lib';
import Modal from 'react-native-modal';

import { TIME_SIGNATURES } from '@src/common/constants';
import { SongDetail } from '@src/common/enums';
import useWheelPickerModalStyles from '@styles/wheelPickerModal';
import StyledText from '@src/common/components/StyledText';
import { SongInfo } from '@src/common/types';

interface Props {
  isWheelOpen: boolean;
  setIsWheelOpen: (value: boolean) => void;
  detail: SongDetail;
  handleInputChange: (key: keyof SongInfo, value: string) => void;
  initialValue: string;
}

const TimeSignatureWheelModal = (props: Props) => {
  const {
    isWheelOpen,
    setIsWheelOpen,
    detail,
    handleInputChange,
    initialValue,
  } = props;
  const styles = useWheelPickerModalStyles();

  const [timeSignature, setTimeSignature] = useState('');

  const onExitPress = () => {
    setIsWheelOpen(false);
    handleInputChange(detail.toLowerCase() as keyof SongInfo, timeSignature);
  };

  return (
    <Modal
      isVisible={isWheelOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
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
