import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page, pageOption, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import PageOptions from '../subcomponents/PageOptions';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { useSelector } from 'react-redux';
import { selectCurrentSongPage } from '@src/selectors/songsSelector';
import StyledText from '@src/common/components/StyledText';

interface Props {
  page: page;
}

const LyricsSheet = ({ page }: Props) => {
  return <StyledText>{page.lyrics}</StyledText>;
};

export default LyricsSheet;
