import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { useColorTheme } from '@src/state/context/ThemeContext';
import EggSelectIcon from '@src/icons/EggSelectIcon';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';
import { Conductor } from '@src/components/common/enums';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';

const ChooseComposer = () => {
  const styles = useSettingsStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { theme } = useColorTheme();

  const handleOnPress = (conductor: Conductor) => {
    dispatch(updateSettingsRequest({ db, updatedSettings: { conductor } }));
  };

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Choose Your Conductor</StyledText>
      <View style={styles.conductorContainer}>
        <TouchableOpacity onPress={() => handleOnPress(Conductor.EGG)}>
          <EggSelectIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOnPress(Conductor.BAD_EGG)}>
          <BadEggSelectIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.conductorContainer}>
        <TouchableOpacity onPress={() => handleOnPress(Conductor.CACSUS)}>
          <CacsusSelectIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOnPress(Conductor.DEAD_ADIM)}>
          <DeadAdimSelectIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseComposer;
