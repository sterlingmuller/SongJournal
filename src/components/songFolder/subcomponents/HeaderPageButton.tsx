import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/components/common/types';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { fetchPageRequest } from '@src/state/sagas/actionCreators';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import { Screen } from '@src/components/common/enums';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { clearPlayback } = useAudioPlayer();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const songId = useAppSelector(selectCurrentSongId);

  const onNavigationPress = () => {
    dispatch(fetchPageRequest({ songId, db }));
    clearPlayback();

    navigate(Screen.LYRICS);
  };

  return (
    <TouchableOpacity onPress={onNavigationPress} hitSlop={20}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
