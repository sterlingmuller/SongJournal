import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import pagesReducer from '@src/slice/pagesSlice';
import takeReducer from '@src/slice/takeSlice';
import currentSongReducer from '@src/slice/currentSongSlice';
import playbackReducer from '@src/slice/playbackSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  pages: pagesReducer,
  take: takeReducer,
  currentSong: currentSongReducer,
  playback: playbackReducer,
});

export default rootReducer;
