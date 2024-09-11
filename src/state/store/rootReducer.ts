import { combineReducers } from 'redux';

import songsReducer from '@src/state/slice/songsSlice';
import pagesReducer from '@src/state/slice/pagesSlice';
import asyncReducer from '@src/state/slice/asyncSlice';
import currentSongReducer from '@src/state/slice/currentSongSlice';
import playbackReducer from '@src/state/slice/playbackSlice';
import artistsReducer from '@src/state/slice/artistsSlice';
import settingsReducer from '@src/state/slice/settingsSlice';
import purchasesReducer from '@src/state/slice/purchasesSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  pages: pagesReducer,
  async: asyncReducer,
  currentSong: currentSongReducer,
  playback: playbackReducer,
  artists: artistsReducer,
  settings: settingsReducer,
  purchases: purchasesReducer,
});

export default rootReducer;
