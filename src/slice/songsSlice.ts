import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import * as t from '@src/common/types';

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
      state.items = state.items.filter(
        (song: t.Song) => song.songId !== action.payload,
      );
    },
    addSong: (state: SongsSliceState, action: PayloadAction<t.Song>) => {
      state.items.push(action.payload);
    },
    removeTake: (
      state: SongsSliceState,
      action: PayloadAction<t.RemoveTakePayload>,
    ) => {
      const { songId, takeId } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.takes = song.takes.filter(
          (take: t.Take) => take.takeId !== takeId,
        );
      }
    },
    addTake: (state: SongsSliceState, action: PayloadAction<t.Take>) => {
      const { songId } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.takes.push(action.payload);
        song.totalTakes++;
        if (song.selectedTakeId === -1) {
          song.selectedTakeId = action.payload.takeId;
        }
      }
    },
    updateTakeNotes: (
      state: SongsSliceState,
      action: PayloadAction<t.UpdateTakeNotesSuccessPayload>,
    ) => {
      const { songId, takeId, notes } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        const take = song.takes.find((take: t.Take) => take.takeId === takeId);
        if (take) {
          take.notes = notes;
        }
      }
    },
    fetchSongsWithTakesRequest: (state: SongsSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSongsWithTakesSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.Songs>,
    ) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchSongsWithTakesFailure: (
      state: SongsSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createSongRequest: (state: SongsSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    createSongSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.Song>,
    ) => {
      state.isLoading = false;
      state.items.push(action.payload);
      state.error = null;
    },
    createSongFailure: (
      state: SongsSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateSelectedTakeIdRequest: (state: SongsSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    updateSelectedTakeIdSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.SetSelectedTakeIdPayload>,
    ) => {
      const { songId, takeId } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.selectedTakeId = takeId;
      }
      state.isLoading = false;
      state.error = null;
    },
    updateSelectedTakeIdFailure: (
      state: SongsSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  removeSong,
  addSong,
  removeTake,
  addTake,
  updateTakeNotes,
  fetchSongsWithTakesRequest,
  fetchSongsWithTakesSuccess,
  fetchSongsWithTakesFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSelectedTakeIdRequest,
  updateSelectedTakeIdSuccess,
  updateSelectedTakeIdFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
