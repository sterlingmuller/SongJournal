import { sortByCategoryName, colorThemeName } from '@src/common/types';
import { Dimensions } from 'react-native';

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
  'Twee',
];

export const DELETE_TAKE_TEXT: string =
  ' will be permanently deleted. This action cannot be undone.';

export const DELETE_SONG_TEXT: string =
  ', its journal entry, and all takes of this song will be permanently deleted. This action cannot be undone.';

export const SCREEN_WIDTH: number = Dimensions.get('window').width;

export const DUMMY_SONGS: any = [
  { key: '1', text: 'Double Bubble' },
  { key: '2', text: 'Fresh Towel' },
  { key: '3', text: 'Try To' },
  { key: '4', text: 'Belly' },
  { key: '5', text: 'Sludge' },
  { key: '6', text: 'Virus' },
  { key: '7', text: 'Jelly' },
];
