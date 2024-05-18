import { combineReducers } from 'redux';

import songsReducer from '@src/slice/songsSlice';
import currentSongReducer from '@src/slice/currentSongSlice';
import currentTakeReducer from '@src/slice/currentTakeSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  currentSong: currentSongReducer,
  currentTake: currentTakeReducer,
});

export default rootReducer;
