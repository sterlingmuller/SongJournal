import React, { useState } from 'react';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useSelector } from 'react-redux';

import SaveAndCancelButtons from '@src/components/common/components/SaveAndCancelButtons';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import useLyricScreenStyles from '@src/styles/lyricsScreen';
import { selectCurrentSongPage } from '@src/state/selectors/pagesSelector';
import { updateLyricsRequest } from '@src/state/sagas/actionCreators';
import TextEditor from '@src/components/common/components/TextEditor';
import { LyricsOption } from '@src/components/common/enums';

interface Props {
  setSelectedOption: (value: LyricsOption) => void;
  songId: number;
}

const EditLyricsSheet = ({ setSelectedOption, songId }: Props) => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { lyrics } = useSelector(selectCurrentSongPage);
  const styles = useLyricScreenStyles();

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);

  const disabled: boolean = newLyrics === lyrics;
  const onCancelPress = () => {
    setNewLyrics(lyrics);
    setSelectedOption(LyricsOption.NONE);
  };

  const onSavePress = () => {
    dispatch(
      updateLyricsRequest({
        songId,
        lyrics: newLyrics,
        db,
      }),
    );

    if (newLyrics) setSelectedOption(LyricsOption.NONE);
  };

  return (
    <>
      <View style={styles.editTextContainer}>
        <TextEditor initialText={lyrics} setText={setNewLyrics} />
      </View>
      <SaveAndCancelButtons
        onPress={onSavePress}
        onExitPress={onCancelPress}
        disabled={disabled}
      />
    </>
  );
};

export default EditLyricsSheet;
