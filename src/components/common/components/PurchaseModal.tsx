import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { updatePurchasesRequest } from '@src/state/sagas/actionCreators';
import { Conductor } from '../enums';
import { CONDUCTOR_ICONS, PURCHASE_KEYS } from '../constants';
import { useColorTheme } from '@src/state/context/ThemeContext';
import usePurchaseModalStyle from '@src/styles/purchaseModal';

interface Props {
  conductorToPurchase: Conductor;
  setConductorToPurchase: (value: Conductor) => void;
}

const PurchaseModal = ({
  conductorToPurchase,
  setConductorToPurchase,
}: Props) => {
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = usePurchaseModalStyle();
  const { theme } = useColorTheme();

  const ConductorIcon = CONDUCTOR_ICONS[conductorToPurchase];
  const purchaseToUpdate = PURCHASE_KEYS[conductorToPurchase];

  const onExitPress = () => {
    setConductorToPurchase(null);
  };

  const onPurchase = () => {
    dispatch(
      updatePurchasesRequest({
        db,
        updatedPurchases: { [purchaseToUpdate]: true },
      }),
    );

    setConductorToPurchase(null);
  };

  console.log('purchase')

  return (
    <Modal
      avoidKeyboard
      onBackdropPress={onExitPress}
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>
          Press below to purchase your Conductor
        </StyledText>
        {ConductorIcon && (
          <View style={styles.conductorContainer}>
            <ConductorIcon
              backgroundColor={theme.conductorBackground}
              selected={false}
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={onPurchase}>
          <StyledText style={styles.price}>$ 0.00</StyledText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PurchaseModal;
