import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { useColorTheme } from '@src/state/context/ThemeContext';
import EggSelectIcon from '@src/icons/EggSelectIcon';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';
import { Conductor } from '@src/components/common/enums';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import LockIcon from '@src/icons/LockIcon';
import { selectPurchases } from '@src/state/selectors/purchasesSelector';
import PurchaseModal from '@src/components/common/components/PurchaseModal';

const ChooseComposer = () => {
  const styles = useSettingsStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { hasBadEgg, hasCacsus, hasDeadAdim } = useAppSelector(selectPurchases);
  const { theme } = useColorTheme();

  const [conductorToPurchase, setConductorToPurchase] =
    useState<Conductor>(null);

  const handleOnPress = (conductor: Conductor) => {
    if (!hasCacsus) {
      setConductorToPurchase(Conductor.CACSUS);
    } else
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
          {!hasBadEgg && (
            <View style={styles.lockedConductorIcon}>
              <LockIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.conductorsContainer}>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.CACSUS)}
          style={styles.conductorContainer}
        >
          <CacsusSelectIcon />
          {!hasCacsus && (
            <View style={styles.lockedConductorIcon}>
              <LockIcon />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnPress(Conductor.DEAD_ADIM)}
          style={styles.conductorContainer}
        >
          <DeadAdimSelectIcon />
          {!hasDeadAdim && (
            <View style={styles.lockedConductorIcon}>
              <LockIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <PurchaseModal
        conductorToPurchase={conductorToPurchase}
        setConductorToPurchase={setConductorToPurchase}
      />
    </View>
  );
};

export default ChooseComposer;
