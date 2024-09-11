import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/components/common/components/StyledText';
import useCommonModalStyle from '@src/styles/commonModal';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { updatePurchasesRequest } from '@src/state/sagas/actionCreators';
import { Conductor } from '../enums';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';

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

  let purchaseColumnToUpdate: string;
  let conductorIcon: React.ReactElement;

  switch (conductorToPurchase) {
    case Conductor.BAD_EGG:
      conductorIcon = <BadEggSelectIcon />;
      purchaseColumnToUpdate = 'hasBadEgg';
      break;
    case Conductor.CACSUS:
      conductorIcon = <CacsusSelectIcon />;
      purchaseColumnToUpdate = 'hasCacsus';
      break;
    case Conductor.DEAD_ADIM:
      conductorIcon = <DeadAdimSelectIcon />;
      purchaseColumnToUpdate = 'hasDeadAdim';
      break;
  }

  const onExitPress = () => {
    setConductorToPurchase(null);
  };

  const onPurchase = () => {
    dispatch(
      updatePurchasesRequest({
        db,
        updatedPurchases: { [purchaseColumnToUpdate]: true },
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
        {conductorIcon}
        <Button title="Purchase" onPress={onPurchase} />
      </View>
    </Modal>
  );
};

export default PurchaseModal;
