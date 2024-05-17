import {
  sortByCategoryName,
  colorThemeName,
  songs,
  songDetail,
  take,
  page,
  song,
} from '@src/common/types';
import { Dimensions } from 'react-native';
import { documentDirectory } from 'expo-file-system';

export const SORTBY_CATEGORY_NAMES: sortByCategoryName[] = [
  'Date',
  'Name',
  'Length',
  'Lyrics',
];

export const COLOR_THEME_NAMES: colorThemeName[] = [
  'Light',
  'Dark',
  'Metal',
  'Psych',
  'Pop',
  'Surf',
];

export const SONG_DETAILS: songDetail[] = [
  { label: 'Key', key: 'keySignature' },
  { label: 'Time', key: 'time' },
  { label: 'Bpm', key: 'bpm' },
];

export const EMPTY_PAGE: page = {
  lyrics: '',
  info: {
    about: '',
    bpm: '',
    keySignature: '',
    time: '',
    completed: false,
  },
};

export const EMPTY_SONG: song = {
  songId: -1,
  title: '',
  selectedTakeId: 0,
  takes: [],
  // page: EMPTY_PAGE,
};

export const DELETE_TAKE_TEXT: string =
  ' will be permanently deleted. This action cannot be undone.';

export const DELETE_SONG_TEXT: string =
  ', its journal entry, and all takes of this song will be permanently deleted. This action cannot be undone.';

export const SCREEN_WIDTH: number = Dimensions.get('window').width;

export const documentsDirectory = documentDirectory + 'SongJournal/';

export const DUMMY_SONGS: songs = [
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
