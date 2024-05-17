import { combineReducers } from 'redux';
import currentSongReducer from '@src/slice/currentSongSlice';
import songsReducer from '@src/slice/songsSlice';

const rootReducer = combineReducers({
  currentSong: currentSongReducer,
  songs: songsReducer,
});

export default rootReducer;
