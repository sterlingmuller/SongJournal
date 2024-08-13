import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import * as t from '@src/common/types';
import * as ac from '@src/sagas/actionCreators';
import * as at from '@src/sagas/actionTypes';

type SongsSliceState = {
  items: t.Songs;
  isLoading: boolean;
  error: Error | null;
};

const initialState: SongsSliceState = {
  items: [],
  isLoading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    removeSong: (state: SongsSliceState, action: PayloadAction<number>) => {
      const indexToRemove = state.items.findIndex(
        (song: t.Song) => song.songId === action.payload,
      );

      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1);
      }
    },
    addSong: (state: SongsSliceState, action: PayloadAction<t.Song>) => {
      state.items.push(action.payload);
    },
    removeTake: (
      state: SongsSliceState,
      action: PayloadAction<t.RemoveTakePayload>,
    ) => {
      const songIndex = state.items.findIndex(
        (song: t.Song) => song.songId === action.payload.songId,
      );

      if (songIndex !== -1) {
        const takeIndex = state.items[songIndex].takes.findIndex(
          (take: t.Take) => take.takeId === action.payload.takeId,
        );

        if (takeIndex !== -1) {
          state.items[songIndex].takes.splice(takeIndex, 1);
        }
      }
    },
    addTake: (state: SongsSliceState, action: PayloadAction<t.Take>) => {
      const newTake = action.payload;
      const songIndex = state.items.findIndex(
        (song: t.Song) => song.songId === newTake.songId,
      );

      if (songIndex !== -1) {
        state.items[songIndex].takes.push(newTake);
        state.items[songIndex].totalTakes++;

        if (state.items[songIndex].selectedTakeId === -1) {
          state.items[songIndex].selectedTakeId = newTake.takeId;
        }
      } else {
        console.warn(`Song with ID ${newTake.songId} not found`);
      }
    },
    updateTakeNotesSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.UpdateTakeNotesSuccessPayload>,
    ) => {
      const { songId, takeId, notes } = action.payload;

      const songIndex = state.items.findIndex(
        (song: t.Song) => song.songId === songId,
      );

      if (songIndex !== -1) {
        const takeIndex = state.items[songIndex].takes.findIndex(
          (take: t.Take) => take.takeId === takeId,
        );

        if (takeIndex !== -1) {
          state.items[songIndex].takes[takeIndex].notes = notes;
        }
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
        ac.fetchSongsWithTakesSuccess,
        (state: SongsSliceState, action: PayloadAction<t.Songs>) => {
          state.isLoading = false;
          state.items = action.payload;
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
        (state: SongsSliceState, action: PayloadAction<t.Song>) => {
          state.isLoading = false;
          state.items.push(action.payload);
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
          action: PayloadAction<t.SetSelectedTakeIdPayload>,
        ) => {
          const { songId, takeId } = action.payload;

          const songIndex = state.items.findIndex(
            (song: t.Song) => song.songId === songId,
          );

          state.isLoading = false;
          state.items[songIndex].selectedTakeId = takeId;
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
export const {
  removeSong,
  addSong,
  removeTake,
  addTake,
  updateTakeNotesSuccess,
} = songsSlice.actions;
