import { hasConductors } from '@src/components/common/types';
import { RootState } from '@src/state/store';

export const selectPurchases = (state: RootState) => state.purchases;

export const selectHasPro = (state: RootState) => state.purchases.hasPro;

export const selectHasConductors = (state: RootState): hasConductors => ({
  hasBadEgg: state.purchases.hasBadEgg,
  hasCacsus: state.purchases.hasCacsus,
  hasDeadAdim: state.purchases.hasDeadAdim,
});
