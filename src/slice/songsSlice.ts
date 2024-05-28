import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import { setSelectedTakeIdPayload, song, take } from '@src/common/types';
import * as ac from '@src/sagas/actionCreators';
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

        if (state.songs[songIndex].selectedTakeId === -1) {
          state.songs[songIndex].selectedTakeId = newTake.takeId;
        }
      } else {
        console.warn('Song with ID ${newTake.songId} not found');
      }
    },
    // setSelectedTakeId: (
    //   state: SongsSliceState,
    //   action: PayloadAction<setSelectedTakeIdPayload>,
    // ) => {
    //   const { songId, takeId } = action.payload;

    //   const songIndex = state.songs.findIndex(
    //     (song: song) => song.songId === songId,
    //   );
    //   state.songs[songIndex].selectedTakeId = takeId;
    // },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SongsSliceState>) => {
    builder
      .addCase(at.FETCH_SONGS_WITH_TAKES_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.fetchSongsWithTakesSuccess,
        (state: SongsSliceState, action: PayloadAction<song[]>) => {
          state.isLoading = false;
          state.songs = action.payload;
        },
      )
      .addCase(
        ac.fetchSongsWithTakesFailure,
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
        ac.createSongSuccess,
        (state: SongsSliceState, action: PayloadAction<song>) => {
          state.isLoading = false;
          state.songs.push(action.payload);
        },
      )
      .addCase(
        ac.createSongFailure,
        (state: SongsSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(at.UPDATE_SELECTED_TAKE_ID_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.updateSelectedTakeIdSuccess,
        (
          state: SongsSliceState,
          action: PayloadAction<setSelectedTakeIdPayload>,
        ) => {
          const { songId, takeId } = action.payload;

          const songIndex = state.songs.findIndex(
            (song: song) => song.songId === songId,
          );

          state.isLoading = false;
          state.songs[songIndex].selectedTakeId = takeId;
        },
      )
      .addCase(
        ac.updateSelectedTakeIdFailure,
        (state: SongsSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default songsSlice.reducer;
export const { removeSong, addSong, addTake } = songsSlice.actions;
