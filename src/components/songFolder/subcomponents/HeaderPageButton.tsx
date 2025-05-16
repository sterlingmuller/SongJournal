import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import PageIcon from '@src/icons/PageIcon';
import { RootStackParamList } from '@src/components/common/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { fetchPageRequest } from '@src/state/sagas/actionCreators';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import { Screen } from '@src/components/common/enums';

const HeaderPageButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const songId = useAppSelector(selectCurrentSongId);

  const onNavigationPress = () => {
    dispatch(fetchPageRequest({ songId, db }));

    navigate(Screen.LYRICS, { previousScreen: Screen.SONG });
  };

  return (
    <TouchableOpacity onPress={onNavigationPress} hitSlop={12}>
      <PageIcon />
    </TouchableOpacity>
  );
};

export default HeaderPageButton;
