import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import { song, take } from '@src/common/types';
import {
  createSongFailure,
  createSongSuccess,
  fetchSongsWithTakesFailure,
  fetchSongsWithTakesSuccess,
} from '@src/sagas/actionCreators';
import * as at from '@src/sagas/actionTypes';

type SliceState = { songs: song[]; isLoading: boolean; error: Error | null };

const initialState: SliceState = { songs: [], isLoading: false, error: null };

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    removeSong: (state: SliceState, action: PayloadAction<number>) => {
      const indexToRemove = state.songs.findIndex(
        (song: song) => song.songId === action.payload,
      );

      if (indexToRemove !== -1) {
        state.songs.splice(indexToRemove, 1);
      }
    },
    addSong: (state: SliceState, action: PayloadAction<song>) => {
      state.songs.push(action.payload);
    },
    addTake: (state: SliceState, action: PayloadAction<take>) => {
      const newTake = action.payload;
      const songIndex = state.songs.findIndex(
        (song: song) => song.songId === newTake.songId,
      );

      if (songIndex !== -1) {
        state.songs[songIndex].takes.push(newTake);
        state.songs[songIndex].totalTakes++;
      } else {
        console.warn('Song with ID ${newTake.songId} not found');
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SliceState>) => {
    builder
      .addCase(at.FETCH_SONGS_WITH_TAKES_REQUEST, (state: SliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchSongsWithTakesSuccess,
        (state: SliceState, action: PayloadAction<song[]>) => {
          state.isLoading = false;
          state.songs = action.payload;
        },
      )
      .addCase(
        fetchSongsWithTakesFailure,
        (state: SliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(at.CREATE_SONG_REQUEST, (state: SliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createSongSuccess,
        (state: SliceState, action: PayloadAction<song>) => {
          state.isLoading = false;
          state.songs.push(action.payload);
        },
      )
      .addCase(
        createSongFailure,
        (state: SliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default songsSlice.reducer;
export const { removeSong, addSong, addTake } = songsSlice.actions;
