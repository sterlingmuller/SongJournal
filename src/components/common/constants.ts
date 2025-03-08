import { Dimensions } from 'react-native';
import { documentDirectory, cacheDirectory } from 'expo-file-system';
import Constants from 'expo-constants';

import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import PlaylistIcon from '@src/icons/PlaylistIcon';
import MusicPlayerIcon from '@src/icons/MusicPlayerIcon';
import SettingIcon from '@src/icons/SettingIcon';
import * as t from '@src/components/common/types';
import {
  ColorTheme,
  SongDetailKey,
  SortBy,
  Filter,
  LyricsOption,
  Conductor,
  Screen,
} from '@src/components/common/enums';
import EggSelectIcon from '@src/icons/EggSelectIcon';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';

export const DROPBOX_CLIENT_ID = Constants.expoConfig.extra.dropboxClientId;
export const DROPBOX_CLIENT_SECRET =
  Constants.expoConfig.extra.dropboxClientSecret;

export const DB_NAME = 'songjournal.db';
export const DB_PATH = `${documentDirectory}SQLite/${DB_NAME}`;
export const AUDIO_DIR = `${cacheDirectory}Audio/`;
export const BACKUP_DIR = `${cacheDirectory}Backup/`;
export const EXTRACT_DIR = `${cacheDirectory}Extract/`;

export const EXPORT_ZIP_PATH = '/songjournal_backup.zip';

export const UPLOAD_QUEUE_KEY = 'UPLOAD_QUEUE';

export const SORT_BY_OPTIONS: SortBy[] = Object.values(SortBy);

export const FILTER_OPTIONS: Filter[] = Object.values(Filter);

export const COLOR_THEME_OPTIONS: ColorTheme[] = Object.values(ColorTheme);

export const SONG_DETAILS: Record<SongDetailKey, string> = {
  [SongDetailKey.KEY_SIGNATURE]: 'Key',
  [SongDetailKey.TIME]: 'Time',
  [SongDetailKey.BPM]: 'Bpm',
};

export const LYRIC_SCREEN_OPTIONS: t.LyricsScreenOption[] = [
  { name: LyricsOption.EDIT, icon: EditIcon },
  { name: LyricsOption.CHORDS, icon: ChordsIcon },
  { name: LyricsOption.METRONOME, icon: MetronomeIcon },
  { name: LyricsOption.SHARE, icon: ShareIcon },
];

export const TABS: t.Tab[] = [
  { name: Screen.HOME, icon: PlaylistIcon },
  { name: Screen.COVERS, icon: MusicPlayerIcon },
  { name: Screen.SETTINGS, icon: SettingIcon },
];

export const CONDUCTOR_ICONS = {
  [Conductor.EGG]: EggSelectIcon,
  [Conductor.BAD_EGG]: BadEggSelectIcon,
  [Conductor.CACSUS]: CacsusSelectIcon,
  [Conductor.DEAD_ADIM]: DeadAdimSelectIcon,
};

export const PURCHASE_KEYS = {
  [Conductor.BAD_EGG]: 'hasBadEgg',
  [Conductor.CACSUS]: 'hasCacsus',
  [Conductor.DEAD_ADIM]: 'hasDeadAdim',
};

export const EMPTY_PAGE: t.Page = {
  lyrics: '',
  info: { about: '', bpm: '', keySignature: '', time: '' },
};

export const EMPTY_SONG: t.Song = {
  songId: -1,
  title: '',
  selectedTakeId: 0,
  totalTakes: 0,
  takes: [],
  page: EMPTY_PAGE,
  completed: false,
  hasLyrics: false,
  isOriginal: true,
  artistId: -1,
  creationDate: '',
  orderNumber: -1,
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
export const SCREEN_HEIGHT: number = Dimensions.get('window').height;

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

export const SORT_SELECT = [
  { label: SortBy.DATE, value: SortBy.DATE },
  { label: SortBy.LAST_UPDATED, value: SortBy.LAST_UPDATED },
  { label: SortBy.NAME, value: SortBy.NAME },
  { label: SortBy.LENGTH, value: SortBy.LENGTH },
];

export const PLAYBACK_START_DELAY = 100;
export const MAX_AUDIO_WAVE_BARS = 40;
export const AUDIO_WAVE_MIDPOINT = 12;
export const AUDIO_UPDATES_PER_SECOND = 12;
export const AUDIO_UPDATE_INTERVAL = 1000 / AUDIO_UPDATES_PER_SECOND;
export const MAX_LEVEL = 50;
export const SILENCE_THRESHOLD = -140;
export const MINIMUM_WAVE_HEIGHT = 22;
export const WAVE_BAR_WIDTH = 6;
export const WAVE_BAR_GAP = 2;
export const WAVE_BAR_TOTAL_WIDTH = WAVE_BAR_WIDTH + WAVE_BAR_GAP;
export const PAN_SENSITIVITY = 0.15;
export const WAVE_CONTAINER_WIDTH = SCREEN_WIDTH * 0.85;
export const MAX_BARS = Math.floor(WAVE_CONTAINER_WIDTH / WAVE_BAR_TOTAL_WIDTH);
export const DOT_HEIGHT = WAVE_BAR_WIDTH * 0.75;

export const HEIGHT_MAPPING: [number, number][] = [
  [42, 0],
  [45, 4],
  [50, 6],
  [60, 10],
  [70, 12],
  [75, 14],
  [78, 18],
  [80, 24],
  [85, 30],
  [87, 36],
  [88, 48],
  [89, 60],
  [90, 72],
  [91, 84],
  [92, 90],
  [93, 96],
  [94, 102],
  [95, 108],
  [96, 114],
  [97, 120],
];

export const MAX_TITLE_LENGTH = 40;
