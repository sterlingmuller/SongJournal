import { SQLiteDatabase } from 'expo-sqlite';

export type FilterOptions = {
  lyrics?: boolean;
  completed?: boolean;
};

export type RootStackParamList = {
  Home: undefined;
  Song: undefined;
  Lyrics: undefined;
  Settings: undefined;
  Recording: { title: string };
  MusicPlayer: undefined;
};

export type TabNames = 'Playlist' | 'MusicPlayer' | 'Settings';
export type Tab = { name: TabNames; icon: React.ComponentType };

export type LyricsScreenOption = {
  name: LyricsOptionName;
  icon: React.ComponentType;
};

export type LyricsOptionName = 'Edit' | 'Chords' | 'Metronome' | 'Share' | '';

export type SelectEntry = { label: string; value: string };

export type DbSong = {
  songId: number;
  title: string;
  selectedTakeId: number;
  totalTakes: number;
  completed: boolean;
  hasLyrics: boolean;
};

export type Take = {
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
};

export type SongUpdates = SongInfo & {
  completed: boolean;
};

export type DbPage = {
  lyrics: string;
  bpm: string;
  keySignature: string;
  time: string;
  about: string;
};

export type Page = {
  lyrics: string;
  info: SongInfo;
};

export type SongToPageMap = {
  [songId: number]: Page;
};

export type Song = {
  songId: number;
  title: string;
  selectedTakeId: number;
  totalTakes: number;
  takes: Takes;
  page: Page;
  completed: boolean;
  hasLyrics: boolean;
};

export interface SongItem extends Song {
  key: string;
}

export type CurrentSong = {
  songId: number;
  songsIndex: number;
};

export type Songs = Song[];

export type Takes = Take[];

export type DeleteObject = {
  type: 'song' | 'take';
  title: string;
  songId: number;
  takeId?: number;
};

export type TakePayload = {
  songId: number;
  title: string;
  date: string;
  uri: string;
  duration: number;
  db: SQLiteDatabase;
};

export type UpdateTakeNotesSagaPayload = {
  db: SQLiteDatabase;
  takeId: number;
  songId: number;
  notes: string;
};

export type UpdateTakeNotesDbPayload = {
  db: SQLiteDatabase;
  takeId: number;
  notes: string;
};

export type UpdateTakeNotesSuccessPayload = {
  takeId: number;
  songId: number;
  notes: string;
};

export type CreateSongPayload = {
  title: string;
  db: SQLiteDatabase;
};

export type DeleteSongPayload = {
  songId: number;
  db: SQLiteDatabase;
};

export type UpdateSelectedTakeIdPayloadDb = {
  songId: number;
  takeId: number;
  db: SQLiteDatabase;
};

export type SetSelectedTakeIdPayload = {
  songId: number;
  takeId: number;
};

export type PlaybackPayload = {
  id: number;
  uri: string;
};

export type FetchPagePayload = {
  songId: number;
  db: SQLiteDatabase;
};

export type FetchPageSuccessPayload = {
  songId: number;
  page: Page;
};

export type UpdateSongInfoPayload = {
  songId: number;
  info?: SongInfo;
  completed?: boolean;
  db: SQLiteDatabase;
};

export type UpdatePageInfoStatePayload = {
  songId: number;
  info: SongInfo;
};

export type UpdateSongCompletionStatePayload = {
  songId: number;
  completed: boolean;
};

export type UpdateLyricsPayload = {
  songId: number;
  lyrics: string;
  db: SQLiteDatabase;
};

export type DeleteTakeSuccessPayload = {
  takeId: number;
  songId: number;
};

export type DeleteTakeSagaPayload = {
  takeId: number;
  songId: number;
  db: SQLiteDatabase;
};

export type DeleteTakeDbPayload = {
  takeId: number;
  db: SQLiteDatabase;
};
