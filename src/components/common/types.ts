import { SQLiteDatabase } from 'expo-sqlite';
import {
  CloudConnection,
  Conductor,
  LyricsOption,
  Screen,
  SortBy,
} from '@src/components/common/enums';

export type FilterOptions = {
  lyrics?: boolean;
  completed?: boolean;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Song: undefined;
  Lyrics: { previousScreen: Screen.HOME | Screen.SONG };
  Settings: undefined;
  Recording: { title: string };
  Covers: undefined;
  Setlist: undefined;
  ConnectionSuccess: undefined;
  TabNavigator: undefined;
};

export type TabNames = 'Home' | 'Covers' | 'Settings' | 'Setlist';
export type Tab = { name: TabNames; icon: React.ComponentType };

export type LyricsScreenOption = {
  name: LyricsOption;
  icon: React.ComponentType;
};

export type SelectEntry = { label: string; value: string };

export type DbSong = {
  songId: number;
  creationDate: Date;
  title: string;
  selectedTakeId: number;
  totalTakes: number;
  completed: boolean;
  hasLyrics: boolean;
  isOriginal: boolean;
  artistId: number;
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

export interface DbPage extends SongInfo {
  lyrics: string;
  revisionId?: string;
  songId: number;
}

export type Page = {
  lyrics: string;
  info: SongInfo;
  revisionId?: string;
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
  page: DbPage;
  completed: boolean;
  hasLyrics: boolean;
  isOriginal: boolean;
  artistId: number;
  creationDate: string;
  orderNumber?: number;
};

export type SyncSettings = {
  isAutoSyncEnabled: boolean;
  isUnstarredTakeConditionEnabled: boolean;
  isCompletedSongConditionEnabled: boolean;
};

export interface UserSettings extends SyncSettings {
  defaultSortType: SortBy;
  isAscending: boolean;
  defaultArtistId: number;
  isNumbered: boolean;
  displayTips: boolean;
  conductor: Conductor;
  cloudConnection: CloudConnection;
}

export type Sort = {
  sortType: SortBy;
  isAscending: boolean;
};

export type Artist = { artistId: number; name: string };
export type Artists = Artist[];

export type Purchases = {
  hasBadEgg: boolean;
  hasCacsus: boolean;
  hasDeadAdim: boolean;
  hasPro: boolean;
};

export type hasConductors = {
  hasBadEgg: boolean;
  hasCacsus: boolean;
  hasDeadAdim: boolean;
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

export type UpdateSongArtistSagaPayload = {
  artistId: number;
  songId: number;
  db: SQLiteDatabase;
};

export type UpdateSongCompletionSagaPayload = {
  completed: boolean;
  songId: number;
  db: SQLiteDatabase;
};

export type UpdateSongTitleSagaPayload = {
  title: string;
  songId: number;
  db: SQLiteDatabase;
};

export type UpdateTakeTitleSagaPayload = {
  title: string;
  songId: number;
  takeId: number;
  db: SQLiteDatabase;
};

export type UpdateTakeTitleDbPayload = {
  title: string;
  takeId: number;
  db: SQLiteDatabase;
};

export type UpdateSongTitleStatePayload = {
  title: string;
  songId: number;
};

export type UpdateTakeTitleStatePayload = {
  title: string;
  songId: number;
  takeId: number;
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
  duration: number;
};

export type FetchPagePayload = {
  songId: number;
  db: SQLiteDatabase;
};

export type FetchPageSuccessPayload = {
  songId: number;
  page: Page;
};

export type UpdatePageInfoPayload = {
  songId: number;
  info: SongInfo;
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

export type UpdateSongArtistStatePayload = {
  songId: number;
  artistId: number;
};

export type UpdateSongHasLyricsStatePayload = {
  songId: number;
  lyrics: string;
};

export type UpdateLyricsPayload = {
  songId: number;
  lyrics: string;
  db: SQLiteDatabase;
};

export type UpdateLyricsStatePayload = {
  songId: number;
  lyrics: string;
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

export type AddArtistDbPayload = {
  name: string;
  db: SQLiteDatabase;
};

export type DeleteArtistDbPayload = {
  artistId: number;
  db: SQLiteDatabase;
};

export type UpdateArtistDbPayload = {
  name: string;
  artistId: number;
  db: SQLiteDatabase;
};

export type UpdateSettingsDbPayload = {
  updatedSettings: Partial<UserSettings>;
  db: SQLiteDatabase;
};

export type UpdatePurchasesDbPayload = {
  updatedPurchases: Partial<Purchases>;
  db: SQLiteDatabase;
};

export type FileToUpload = { path: string; uri: string };
