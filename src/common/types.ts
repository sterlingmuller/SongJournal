import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '@src/store';
import { SQLiteDatabase } from 'expo-sqlite';

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
  Recording: { title: string };
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
  totalTakes: number;
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
  totalTakes: number;
  takes: take[];
  page: page;
};

export type currentSong = {
  songId: number;
  songsIndex: number;
};

export type songs = song[];

export type createSongResult = {
  songId: number;
  title: string;
  selectedTakeId: number;
  page: page;
  totalTakes: number;
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
  db: SQLiteDatabase;
};

export type createSongPayload = {
  title: string;
  db: SQLiteDatabase;
};

export type updateSelectedTakeIdPayloadDb = {
  songId: number;
  takeId: number;
  db: SQLiteDatabase;
};

export type setSelectedTakeIdPayload = {
  songId: number;
  takeId: number;
};

export type Selector<S> = (state: RootState) => S;
