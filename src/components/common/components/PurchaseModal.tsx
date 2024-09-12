import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import useCommonModalStyle from '@src/styles/commonModal';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { updatePurchasesRequest } from '@src/state/sagas/actionCreators';
import { Conductor } from '../enums';
import { CONDUCTOR_ICONS, PURCHASE_KEYS } from '../constants';
import { useColorTheme } from '@src/state/context/ThemeContext';

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
  const styles = useCommonModalStyle();
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

  return (
    <Modal
      isVisible={!!conductorToPurchase}
      avoidKeyboard
      onBackdropPress={onExitPress}
    >
      <View style={styles.container}>
        <StyledText style={styles.title}>
          Press below to purchase your Conductor
        </StyledText>
        {ConductorIcon && (
          <ConductorIcon
            backgroundColor={theme.conductorBackground}
            selected={false}
          />
        )}
        <Button title="Purchase" onPress={onPurchase} />
      </View>
    </Modal>
  );
};

export default PurchaseModal;
