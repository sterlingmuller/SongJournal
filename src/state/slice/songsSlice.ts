import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as t from '@src/components/common/types';

type SongsSliceState = {
  items: t.Songs;
};

const initialState: SongsSliceState = {
  items: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsWithTakesSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.Songs>,
    ) => {
      state.items = action.payload;
    },
    createSongSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.Song>,
    ) => {
      state.items.push(action.payload);
    },
    updateSongTitleSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.UpdateSongTitleStatePayload>,
    ) => {
      const { songId, title: newTitle } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.title = newTitle;
      }
    },
    removeSongSuccess: (
      state: SongsSliceState,
      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        (song: t.Song) => song.songId !== action.payload,
      );
    },
    removeTakeSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.DeleteTakeSuccessPayload>,
    ) => {
      const { songId, takeId } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.takes = song.takes.filter(
          (take: t.Take) => take.takeId !== takeId,
        );
      }
    },
    updateTakeNotesSuccess: (
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
    createTakeSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.Take>,
    ) => {
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
    updateSelectedTakeIdSuccess: (
      state: SongsSliceState,
      action: PayloadAction<t.SetSelectedTakeIdPayload>,
    ) => {
      const { songId, takeId } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.selectedTakeId = takeId;
      }
    },
    updateSongCompletion: (
      state: SongsSliceState,
      action: PayloadAction<t.UpdateSongCompletionStatePayload>,
    ) => {
      const { songId, completed } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.completed = completed;
      }
    },
    updateSongHasLyrics: (
      state: SongsSliceState,
      action: PayloadAction<t.UpdateSongHasLyricsStatePayload>,
    ) => {
      const { songId, lyrics } = action.payload;
      const song = state.items.find((song: t.Song) => song.songId === songId);
      if (song) {
        song.hasLyrics = !!lyrics.trim();
      }
    },
  },
});

export const {
  fetchSongsWithTakesSuccess,
  createSongSuccess,
  updateSongTitleSuccess,
  removeSongSuccess,
  removeTakeSuccess,
  updateTakeNotesSuccess,
  createTakeSuccess,
  updateSelectedTakeIdSuccess,
  updateSongCompletion,
  updateSongHasLyrics,
} = songsSlice.actions;

export default songsSlice.reducer;
