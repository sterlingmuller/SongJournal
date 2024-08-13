import { Dimensions } from 'react-native';
import { documentDirectory } from 'expo-file-system';

import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';
import * as t from '@src/common/types';
import { ColorTheme, SongDetail, SortBy } from '@src/common/enums';

export const SORT_BY_OPTIONS: SortBy[] = Object.values(SortBy);

export const COLOR_THEME_OPTIONS: ColorTheme[] = Object.values(ColorTheme);

export const SONG_DETAILS: SongDetail[] = Object.values(SongDetail);

export const LYRIC_SCREEN_OPTIONS: t.LyricsScreenOption[] = [
  { name: 'Edit', icon: EditIcon },
  { name: 'Chords', icon: ChordsIcon },
  { name: 'Metronome', icon: MetronomeIcon },
  { name: 'Share', icon: ShareIcon },
];

export const TABS: t.Tab[] = [
  { name: 'Playlist', icon: PlaylistIcon },
  { name: 'MusicPlayer', icon: MusicPlayerIcon },
  { name: 'Settings', icon: SettingIcon },
];

export const EMPTY_PAGE: t.Page = {
  lyrics: '',
  info: { about: '', bpm: '', keySignature: '', time: '', completed: false },
};

export const EMPTY_SONG: t.Song = {
  songId: -1,
  title: '',
  selectedTakeId: 0,
  totalTakes: 0,
  takes: [],
  page: EMPTY_PAGE,
};

export const DELETE_TAKE_TEXT: string =
  ' will be permanently deleted. This action cannot be undone.';

export const DELETE_SONG_TEXT: string =
  ', its journal entry, and all takes of this song will be permanently deleted. This action cannot be undone.';

export const EMPTY_DELETE_OBJECT: t.DeleteObject = {
  type: null,
  songId: -1,
  title: '',
};

export const EMPTY_TAKE: t.Take = {
  takeId: -1,
  songId: -1,
  title: '',
  date: '',
  uri: '',
  duration: -1,
  notes: '',
};

export const SCREEN_WIDTH: number = Dimensions.get('window').width;

export const documentsDirectory = documentDirectory + 'SongJournal/';

export const getStartedSongInstructions =
  'Press the RECORD button below to record your first take!';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
