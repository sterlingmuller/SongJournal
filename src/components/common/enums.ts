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
  DARK = 'Dark - In Development',
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
