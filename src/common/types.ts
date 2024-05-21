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
  Recording: undefined;
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

export type songInfo = {
  songId: number;
  title: string;
  selectedTakeId: number;
};

export type take = {
  takeId: number;
  songId: number;
  title: string;
  date: string;
  uri: string;
  duration: number;
  notes?: string;
};

export type page = {
  lyrics?: string;
  bpm?: string;
  keySignature?: string;
  time?: string;
  about?: string;
  completed: boolean;
};

export type song = {
  songId: number;
  title: string;
  selectedTakeId: number;
  takes: take[];
  page: page;
};

export type songs = song[];

export type createSongResult = {
  songId: number;
  title: string;
  selectedTakeId: number;
  page: page;
};

export type getTakesAndPageResult = {
  takes: take[];
  page: page;
};

export type deleteObject = {
  type: 'song' | 'take';
  id: number;
  title: string;
};

export type takePayload = {
  songId: number;
  title: string;
  date: string;
  uri: string;
  duration: number;
};
