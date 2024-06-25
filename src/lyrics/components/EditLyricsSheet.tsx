import React, { useEffect, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useSelector } from 'react-redux';
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { pageOption } from '@src/common/types';
import { useAppDispatch } from '@src/common/hooks';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { selectCurrentSongPage } from '@src/selectors/songsSelector';
import { updateLyricsRequest } from '@src/sagas/actionCreators';
import TextEditor from '@src/common/components/TextEditor';
// import TextEditor from '@src/common/components/TextEditor';

interface Props {
  setSelectedOption: (value: pageOption) => void;
  songId: number;
}

const EditLyricsSheet = ({ setSelectedOption, songId }: Props) => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { lyrics } = useSelector(selectCurrentSongPage);
  const styles = useLyricSheetStyles();

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);

  const disabled: boolean = newLyrics === lyrics;
  const onCancelPress = () => {
    setNewLyrics(lyrics);
    setSelectedOption('');
  };

  const onSavePress = () => {
    dispatch(
      updateLyricsRequest({
        songId,
        lyrics: newLyrics,
        db,
      }),
    );

    setSelectedOption('');
  };

  return (
    <View>
      <View style={{ height: '50%' }}>
        <TextEditor initialText={lyrics} setText={setNewLyrics} />
      </View>
      <SaveAndCancelButtons
        onPress={onSavePress}
        onExitPress={onCancelPress}
        disabled={disabled}
      />
    </View>
  );
};

export default EditLyricsSheet;

{
  /* <View>
  <View style={{ height: '50%' }}>
    <TextInput
      style={styles.textContainer}
      value={newLyrics}
      onChangeText={(text: string) => setNewLyrics(text)}
      placeholder="Add lyrics..."
      textAlignVertical="top"
    />

    <TextEditor
      initialText={newLyrics}
      onChangeText={(text: string) => setNewLyrics(text)}
    />
  </View>
  <SaveAndCancelButtons
    onPress={onSavePress}
    onExitPress={onCancelPress}
    disabled={disabled}
  />
</View>; */
}
