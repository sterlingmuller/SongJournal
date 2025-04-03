export enum Screen {
  SONG = 'Song',
  RECORDING = 'Recording',
  HOME = 'Originals',
  LYRICS = 'Lyrics',
  COVERS = 'Covers',
  SETLIST = 'Setlist',
  SETTINGS = 'Settings',
  CONNECTION_SUCCESS = 'ConnectionSuccess',
  TABS = 'Tabs',
}

export enum RequestStatus {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  LOADING = 'Loading',
  IDLE = 'Idle',
}

export enum ColorTheme {
  LIGHT = 'Light',
  DARK = 'Dark',
  SURF = 'Surf',
  METAL = 'Metal - In Development',
  PSYCH = 'Psych - In Development',
  POP = 'Pop - In Development',
}

export enum SortBy {
  DATE = 'Date',
  LAST_UPDATED = 'Last Updated',
  NAME = 'Name',
  LENGTH = 'Length',
}

export enum Filter {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  LYRICS = 'Lyrics',
  LYRICLESS = 'Lyricless',
}

export enum SongDetailKey {
  KEY_SIGNATURE = 'keySignature',
  TIME = 'time',
  BPM = 'bpm',
}

export enum LyricsOption {
  EDIT = 'Edit',
  CHORDS = 'Chords',
  METRONOME = 'Metronome',
  SHARE = 'Share',
  NONE = '',
}

export enum LyricsSection {
  INTRO = '[Intro]',
  VERSE = '[Verse]',
  PRE_CHORUS = '[Pre-Chorus]',
  CHORUS = '[Chorus]',
  BRIDGE = '[Bridge]',
  OUTRO = '[Outro]',
}

export enum ToggleableSettings {
  DISPLAY_TIPS = 'displayTips',
  IS_NUMBERED = 'isNumbered',
  IS_ASCENDING = 'isAscending',
  IS_STARRED_TAKE_CONDITION_ENABLED = 'isUnstarredTakeConditionEnabled',
  IS_COMPLETED_SONG_CONDITION_ENABLED = 'isCompletedSongConditionEnabled',
  IS_AUTO_SYNC_ENABLED = 'isAutoSyncEnabled',
}

export enum Conductor {
  EGG = 'EGG',
  BAD_EGG = 'BAD EGG',
  CACSUS = 'CACsus',
  DEAD_ADIM = 'DEAD Adim',
}

export enum CloudConnection {
  GOOGLE_DRIVE = 'Google Drive',
  DROPBOX = 'Dropbox',
  ICLOUD = 'iCloud',
  NONE = 'None',
}

export enum CloudFileType {
  TAKE = 'take',
  STARRED_TAKE = 'starred take',
  PAGE = 'page',
  ZIP = 'zip',
}

export enum MessageIntent {
  GET_STARTED_HOME = 'get started home',
  GET_STARTED_LYRICS = 'get started lyrics',
  GET_STARTED_SONG = 'get started song',
  HIDE_COVERS_SCREEN = 'hide covers screen',
  HIDE_SETLIST_SCREEN = 'hise setlist screen',
  DROPBOX_CONNECTION_SUCCESS = 'dropbox connection success',
  EMPTY_SEARCH = 'empty search',
}
