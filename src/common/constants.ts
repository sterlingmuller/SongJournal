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

export const SORTBY_CATEGORY_NAMES: t.sortByCategoryName[] = [
  'Date',
  'Name',
  'Length',
];

export const COLOR_THEME_NAMES: t.colorThemeName[] = [
  'Light',
  'Dark',
  'Metal',
  'Psych',
  'Pop',
  'Surf',
];

export const SONG_DETAILS: t.songDetail[] = [
  { label: 'Key', key: 'keySignature' },
  { label: 'Time', key: 'time' },
  { label: 'Bpm', key: 'bpm' },
];

export const LYRIC_SCREEN_OPTIONS: t.LyricsScreenOption[] = [
  { name: 'Edit', icon: EditIcon },
  { name: 'Chords', icon: ChordsIcon },
  { name: 'Metronome', icon: MetronomeIcon },
  { name: 'Share', icon: ShareIcon },
];

export const TABS: t.tab[] = [
  { name: 'Playlist', icon: PlaylistIcon },
  { name: 'MusicPlayer', icon: MusicPlayerIcon },
  { name: 'Settings', icon: SettingIcon },
];

export const EMPTY_PAGE: t.page = {
  lyrics: '',
  info: { about: '', bpm: '', keySignature: '', time: '', completed: false },
};

export const EMPTY_SONG: t.song = {
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

export const EMPTY_DELETE_OBJECT: t.deleteObject = {
  type: null,
  songId: -1,
  title: '',
};

export const EMPTY_TAKE: t.take = {
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

export const DUMMY_SONGS: t.songs = [
  {
    key: 0,
    title: 'Dubble Bubble',
    selectedTake: 2,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Need to figure out what to do in the bridge',
        starred: false,
      },
      {
        key: 1,
        title: 'Take 2',
        date: 'March 16, 2024',
        notes: '',
        starred: false,
      },
      {
        key: 2,
        title: 'Take 3',
        date: 'March 17, 2024',
        notes: '',
        starred: true,
      },
      {
        key: 3,
        title: 'Ry on Trumper',
        date: 'March 20, 2024',
        notes: '',
        starred: false,
      },
    ],
    page: {
      lyrics: 'La la la la laaaaa!',
      info: {
        about: 'I wrote this song when I was listening to The Cure a lot',
        bpm: '120',
        keySignature: 'G',
        time: '4/4',
        completed: true,
      },
    },
  },
  {
    key: 1,
    title: 'Try To',
    selectedTake: 0,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Nailed it first take',
        starred: true,
      },
    ],
    page: {
      lyrics: 'La la la la laaaaa!',
      info: {
        about: 'I wrote this song when I was listening to The Cure a lot',
        bpm: '90',
        keySignature: 'G',
        time: '4/4',
        completed: true,
      },
    },
  },
  {
    key: 2,
    title: 'Fresh Towel',
    selectedTake: 2,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Need to figure out what to do in the bridge',
        starred: false,
      },
      {
        key: 1,
        title: 'Take 2',
        date: 'March 16, 2024',
        notes: '',
        starred: false,
      },
      {
        key: 2,
        title: 'Take 3',
        date: 'March 17, 2024',
        notes: '',
        starred: true,
      },
      {
        key: 3,
        title: 'Ry on Trumper',
        date: 'March 20, 2024',
        notes: '',
        starred: false,
      },
    ],
    page: {
      lyrics: '',
      info: {
        about: '',
        bpm: '110',
        keySignature: '',
        time: '',
        completed: false,
      },
    },
  },
  {
    key: 3,
    title: 'Belly',
    selectedTake: 2,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Need to figure out what to do in the bridge',
        starred: false,
      },
      {
        key: 1,
        title: 'Take 2',
        date: 'March 16, 2024',
        notes: '',
        starred: false,
      },
      {
        key: 2,
        title: 'Take 3',
        date: 'March 17, 2024',
        notes: '',
        starred: true,
      },
      {
        key: 3,
        title: 'Ry on Trumper',
        date: 'March 20, 2024',
        notes: '',
        starred: false,
      },
    ],
    page: {
      lyrics: 'La la la la laaaaa!',
      info: {
        about: '',
        bpm: null,
        keySignature: 'F',
        time: '4/4',
        completed: false,
      },
    },
  },
  {
    key: 4,
    title: 'Sludge',
    selectedTake: 2,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Need to figure out what to do in the bridge',
        starred: false,
      },
      {
        key: 1,
        title: 'Take 2',
        date: 'March 16, 2024',
        notes: '',
        starred: false,
      },
      {
        key: 2,
        title: 'Take 3',
        date: 'March 17, 2024',
        notes: '',
        starred: true,
      },
      {
        key: 3,
        title: 'Ry on Trumper',
        date: 'March 20, 2024',
        notes: '',
        starred: false,
      },
    ],
    page: {
      lyrics: 'La la la la laaaaa!',
      info: {
        about: '',
        bpm: null,
        keySignature: '',
        time: '',
        completed: false,
      },
    },
  },
  {
    key: 5,
    title: 'Virus',
    selectedTake: 2,
    takes: [
      {
        key: 0,
        title: 'Take 1',
        date: 'March 14, 2024',
        notes: 'Need to figure out what to do in the bridge',
        starred: false,
      },
      {
        key: 1,
        title: 'Take 2',
        date: 'March 16, 2024',
        notes: '',
        starred: false,
      },
      {
        key: 2,
        title: 'Take 3',
        date: 'March 17, 2024',
        notes: '',
        starred: true,
      },
      {
        key: 3,
        title: 'Ry on Trumper',
        date: 'March 20, 2024',
        notes: '',
        starred: false,
      },
    ],
    page: {
      lyrics: 'La la la la laaaaa!',
      info: {
        about: '',
        bpm: null,
        keySignature: '',
        time: '',
        completed: false,
      },
    },
  },
];
