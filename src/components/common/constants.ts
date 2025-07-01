import { Dimensions } from 'react-native';
import { documentDirectory, cacheDirectory } from 'expo-file-system';
import Constants from 'expo-constants';

import EditIcon from '@src/icons/EditIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import * as t from '@src/components/common/types';
import {
  ColorTheme,
  SongDetailKey,
  SortBy,
  Filter,
  LyricsOption,
  Conductor,
} from '@src/components/common/enums';
import EggSelectIcon from '@src/icons/EggSelectIcon';
import BadEggSelectIcon from '@src/icons/BadEggSelectIcon';
import CacsusSelectIcon from '@src/icons/CacsusSelectIcon';
import DeadAdimSelectIcon from '@src/icons/DeadAdimSelectIcon';
import AddDetailsIcon from '@src/icons/AddDetailsIcon';

export const APP_VERSION = '0.3.7';
export const applicationId = 'com.sterling.silverado.songjournal';

export const DROPBOX_CLIENT_ID = Constants.expoConfig.extra.DROPBOX_CLIENT_ID;
export const DROPBOX_CLIENT_SECRET =
  Constants.expoConfig.extra.DROPBOX_CLIENT_SECRET;

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
  // { name: LyricsOption.CHORDS, icon: ChordsIcon },
  { name: LyricsOption.ADD_DETAILS, icon: AddDetailsIcon },
  { name: LyricsOption.METRONOME, icon: MetronomeIcon },
  { name: LyricsOption.SHARE, icon: ShareIcon },
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
  ', its journal entry, and all takes of the song will be permanently deleted. This action cannot be undone.';

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

export const MINIMUM_DURATION = 3;
export const PLAYBACK_START_DELAY = 100;
export const MAX_AUDIO_WAVE_BARS = 40;
export const AUDIO_WAVE_MIDPOINT = 12;
export const AUDIO_UPDATES_PER_SECOND = 16;
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
  [82, 0],
  [84, 5],
  [86, 10],
  [87, 15],
  [88, 20],
  [89, 25],
  [90, 30],
  [91, 35],
  [92, 40],
  [92.5, 45],
  [93, 50],
  [93.25, 55],
  [93.5, 60],
  [93.75, 65],
  [94, 70],
  [94.25, 75],
  [94.5, 80],
  [94.75, 85],
  [95, 90],
  [95.25, 95],
  [95.5, 100],
  [100, 100],
];

export const MAX_TITLE_LENGTH = 40;

export const SWIPE_THRESHOLD = -100;
export const SWIPE_TRIGGER_THRESHOLD = -40;

export const SUPPORT_EMAIL = 'SongJournalContact@gmail.com';

export const PLACEHOLDER_TITLE = 'Cobra Strike Deluxe';

export const START_TIP: string =
  'Tip: Visit Settings for the options to number your songs list and disable future tips';
export const HOME_TIP: string =
  'Tip: Long press to edit a title on the Home or Song screen';
export const SONG_SCREEN_TIP: string =
  'Tip: Your Starred Take is the song version that will play on the Home screen and be used when sharing. By default, your oldest take is starred.';
export const STAR_TAKE_TIP: string =
  'Tip: When there are multiple takes of a song, Double tap a take to set it as the new Starred Take';
export const EDIT_LYRICS_TIP: string =
  'Tip: Press Help in the header for guidance on using the lyric shortcuts below.';
export const LYRICS_TIP: string =
  'Tip: Song Details will be added to your Lyrics pdf when shared.';
export const COMPLETED_TIP: string =
  'Tip: Mark songs as "Completed" to filter for them in searches and auto-Sync.';
export const SORT_TIP: string =
  'Tip: Press a selected sort option to toggle between Descending and Ascending';


  export const MIN_TOUCH_SIZE = 48;