import { Dimensions } from 'react-native';
import { documentDirectory } from 'expo-file-system';

import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';
import * as t from '@src/components/common/types';
import { ColorTheme, SongDetail, SortBy } from '@src/components/common/enums';

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

export const FRACTION_UNICODE = '\u2044';

export const ROOT_NOTES = [
  { label: '', value: '' },
  { label: 'C', value: 'C' },
  { label: 'C#', value: 'C#' },
  { label: 'D', value: 'D' },
  { label: 'E♭', value: 'E♭' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'F#', value: 'F#' },
  { label: 'G', value: 'G' },
  { label: 'G#', value: 'G#' },
  { label: 'A', value: 'A' },
  { label: 'B♭', value: 'B♭' },
  { label: 'B', value: 'B' },
];

export const CHORD_EXTENSIONS = [
  { label: '', value: '' },
  { label: 'm', value: 'm' },
  { label: '7', value: '7' },
  { label: 'add9', value: 'add9' },
  { label: 'sus4', value: 'sus4' },
  { label: 'dim', value: 'dim' },
];

export const TIME_SIGNATURES = [
  { label: '', value: '' },
  { label: '4/4', value: '4/4' },
  { label: '3/4', value: '3/4' },
  { label: '2/4', value: '2/4' },
  { label: '6/8', value: '6/8' },
  { label: '9/8', value: '9/8' },
  { label: '12/8', value: '12/8' },
  { label: '5/4', value: '5/4' },
  { label: '7/8', value: '7/8' },
  { label: '10/4', value: '10/4' },
  { label: '11/8', value: '11/8' },
  { label: '2/2', value: '2/2' },
];

export const MAX_AUDIO_WAVE_BARS = 24;

export const AUDIO_WAVE_MIDPOINT = 12;

export const AUDIO_UPDATES_PER_SECOND = 10;

export const AUDIO_UPDATE_INTERVAL = 1000 / AUDIO_UPDATES_PER_SECOND;

export const LEADING_DOTS_ARRAY: null[] = new Array(5).fill(null);

export const EMPTY_AUDIO_WAVE_ARRAY = new Array(
  MAX_AUDIO_WAVE_BARS - LEADING_DOTS_ARRAY.length,
).fill(null);
