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

type SongsSliceState = {
  songs: song[];
  isLoading: boolean;
  error: Error | null;
};

const initialState: SongsSliceState = {
  songs: [],
  isLoading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    removeSong: (state: SongsSliceState, action: PayloadAction<number>) => {
      const indexToRemove = state.songs.findIndex(
        (song: song) => song.songId === action.payload,
      );

      if (indexToRemove !== -1) {
        state.songs.splice(indexToRemove, 1);
      }
    },
    addSong: (state: SongsSliceState, action: PayloadAction<song>) => {
      state.songs.push(action.payload);
    },
    addTake: (state: SongsSliceState, action: PayloadAction<take>) => {
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
  extraReducers: (builder: ActionReducerMapBuilder<SongsSliceState>) => {
    builder
      .addCase(at.FETCH_SONGS_WITH_TAKES_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchSongsWithTakesSuccess,
        (state: SongsSliceState, action: PayloadAction<song[]>) => {
          state.isLoading = false;
          state.songs = action.payload;
        },
      )
      .addCase(
        fetchSongsWithTakesFailure,
        (state: SongsSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(at.CREATE_SONG_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createSongSuccess,
        (state: SongsSliceState, action: PayloadAction<song>) => {
          state.isLoading = false;
          state.songs.push(action.payload);
        },
      )
      .addCase(
        createSongFailure,
        (state: SongsSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default songsSlice.reducer;
export const { removeSong, addSong, addTake } = songsSlice.actions;
