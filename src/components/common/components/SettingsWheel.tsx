import React from 'react';
import { View } from 'react-native';
import {
  WheelPicker,
  WheelPickerAlign,
  WheelPickerItemProps,
} from 'react-native-ui-lib';
import Modal from 'react-native-modal';

import useWheelPickerModalStyles from '@src/styles/wheelPickerModal';
import StyledText from '@src/components/common/components/StyledText';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Props {
  isWheelOpen: boolean;
  onExitPress: () => void;
  handleInputChange: (value: string | number) => void;
  initialValue: string | number;
  label: string;
  items: WheelPickerItemProps<string | number>[];
}

const SettingsWheel = (props: Props) => {
  const {
    isWheelOpen,
    onExitPress,
    handleInputChange,
    initialValue,
    label,
    items,
  } = props;
  const styles = useWheelPickerModalStyles();
  const { theme } = useColorTheme();

  return (
    <Modal
      isVisible={isWheelOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>{label}</StyledText>
        <View style={styles.line} />
        <WheelPicker
          items={items}
          textStyle={styles.wheelText}
          inactiveTextColor={theme.secondaryText}
          activeTextColor={theme.wheelSelected}
          onChange={(item: string) => handleInputChange(item)}
          align={WheelPickerAlign.CENTER}
          style={styles.timeSection}
          faderProps={{ size: 0 }}
          initialValue={initialValue}
        />
      </View>
    </Modal>
  );
};

export default SettingsWheel;
