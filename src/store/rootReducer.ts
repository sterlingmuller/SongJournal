import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import takeReducer from '@src/slice/takeSlice';
import currentSongReducer from '@src/slice/currentSongSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  take: takeReducer,
  currentSong: currentSongReducer,
});

export default rootReducer;
