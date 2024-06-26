import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '@src/store';
import { SQLiteDatabase } from 'expo-sqlite';

export type appState = 'active' | 'background';

export type sortByCategoryName = 'Date' | 'Name' | 'Length';

export type FilterOptions = {
  lyrics?: boolean;
  completed?: boolean;
};

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

export type LyricsScreenOption = {
  name: LyricsOptionName;
  icon: React.ComponentType;
};

export type LyricsOptionName = 'Edit' | 'Chords' | 'Metronome' | 'Share' | '';

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

export type SongInfo = {
  bpm?: string;
  keySignature?: string;
  time?: string;
  about?: string;
  completed: boolean;
};

export type page = {
  lyrics: string;
  info: SongInfo;
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

export type playbackPayload = {
  id: number;
  uri: string;
};

export type fetchPagePayload = {
  songId: number;
  db: SQLiteDatabase;
};

export type fetchPageSuccessPayload = {
  songId: number;
  page: page;
};

export type updatePageInfoPayload = {
  songId: number;
  info: SongInfo;
  db: SQLiteDatabase;
};

export type UpdatePageInfoSuccess = {
  songId: number;
  info: SongInfo;
};

export type updateLyricsPayload = {
  songId: number;
  lyrics: string;
  db: SQLiteDatabase;
};

export type updateLyricsSuccess = {
  songId: number;
  lyrics: string;
};

export type Selector<S> = (state: RootState) => S;
