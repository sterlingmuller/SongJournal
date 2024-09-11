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
import LockIcon from '@src/icons/LockIcon';

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
      <View style={styles.conductorsContainer}>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.EGG)}
          style={styles.conductorContainer}
        >
          <EggSelectIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.BAD_EGG)}
          style={styles.conductorContainer}
        >
          <BadEggSelectIcon />
          <View style={styles.lockedConductorIcon}>
            <LockIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.conductorsContainer}>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.CACSUS)}
          style={styles.conductorContainer}
        >
          <CacsusSelectIcon />
          <View style={styles.lockedConductorIcon}>
            <LockIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.DEAD_ADIM)}
          style={styles.conductorContainer}
        >
          <DeadAdimSelectIcon />
          <View style={styles.lockedConductorIcon}>
            <LockIcon />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseComposer;
