import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type appState = 'active' | 'background';

export type sortByCategoryName = 'Date' | 'Name' | 'Length' | 'Lyrics';

export type colorThemeName =
  | 'Light'
  | 'Dark'
  | 'Metal'
  | 'Psych'
  | 'Pop'
  | 'Surf';

export type RootStackParamList = {
  Home: undefined;
  Song: undefined;
  Lyrics: undefined;
  Settings: undefined;
  MusicPlayer: undefined;
};

export type songNavigation = NativeStackScreenProps<RootStackParamList, 'Song'>;

export type lyricNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Lyrics'
>;

export type lyricsScreenRouteParams = {
  song: song;
};

export type test = { params: lyricsScreenRouteParams };

export type songDetail = { label: string; key: string };

export type pageOption = 'edit' | 'chords' | 'metronome' | 'share';

export type take = {
  key: number;
  title: string;
  date: string;
  notes?: string;
  starred: boolean;
};

export type info = {
  bpm?: string;
  keySignature?: string;
  time?: string;
  about?: string;
  completed: boolean;
};

export type page = {
  lyrics?: string;
  info: info;
};

export type song = {
  key: number;
  title: string;
  selectedTake: number;
  takes: take[];
  page: page;
};

export type songs = song[];
