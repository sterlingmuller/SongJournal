import React, { useCallback, useState, lazy } from 'react';
import { TouchableOpacity, View } from 'react-native';

import StyledText from '@src/components/common/components/StyledText';
import useSettingsStyle from '@src/styles/settings';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { Conductor } from '@src/components/common/enums';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { updateSettingsRequest } from '@src/state/sagas/actionCreators';
import { useSQLiteContext } from 'expo-sqlite';
import LockIcon from '@src/icons/LockIcon';
import { selectPurchases } from '@src/state/selectors/purchasesSelector';
import {
  CONDUCTOR_ICONS,
  PURCHASE_KEYS,
} from '@src/components/common/constants';
import { selectConductor } from '@src/state/selectors/settingsSelector';
import PurchaseModal from '@src/components/common/components/PurchaseModal';

const ChooseComposer = () => {
  const styles = useSettingsStyle();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const purchases = useAppSelector(selectPurchases);
  const { theme } = useColorTheme();
  const selectedConductor = useAppSelector(selectConductor);

  const conductorsArray = Object.values(Conductor);

  const [conductorToPurchase, setConductorToPurchase] =
    useState<Conductor>(null);

  const handleOnPress = (conductor: Conductor) => {
    if (conductor === Conductor.EGG || purchases[PURCHASE_KEYS[conductor]]) {
      dispatch(updateSettingsRequest({ db, updatedSettings: { conductor } }));
    } else {
      setConductorToPurchase(conductor);
    }
  };

  const renderConductor = useCallback(
    (conductor: Conductor) => {
      const ConductorIcon = CONDUCTOR_ICONS[conductor];
      const isPurchased =
        conductor === Conductor.EGG || purchases[PURCHASE_KEYS[conductor]];
      const isSelected = selectedConductor === conductor;
      const iconBackgroundColor = isSelected
        ? theme.settingsEmphasis
        : theme.conductorBackground;

      const handleConductorPress = (conductor: Conductor) => () => {
        handleOnPress(conductor);
      };

      return (
        <TouchableOpacity
          key={conductor}
          onPress={handleConductorPress(conductor)}
          style={styles.conductorContainer}
        >
          <ConductorIcon
            backgroundColor={iconBackgroundColor}
            selected={isSelected}
          />
          {!isPurchased && (
            <View style={styles.lockedConductorIcon}>
              <LockIcon />
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [purchases, selectedConductor, theme],
  );

  return (
    <View>
      <StyledText style={styles.sectionTitle}>Choose Your Conductor</StyledText>
      <View style={styles.conductorRow}>
        {conductorsArray.slice(0, 2).map(renderConductor)}
      </View>
      <View style={styles.conductorRow}>
        {conductorsArray.slice(2, 4).map(renderConductor)}
      </View>
      {conductorToPurchase && <PurchaseModal
        conductorToPurchase={conductorToPurchase}
        setConductorToPurchase={setConductorToPurchase}
      />}
    </View>
  );
};

export default ChooseComposer;
