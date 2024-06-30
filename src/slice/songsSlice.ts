import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import {
  RemoveTakePayload,
  UpdatePageInfoSuccess,
  UpdateTakeNotesSuccessPayload,
  fetchPageSuccessPayload,
  setSelectedTakeIdPayload,
  song,
  take,
  updateLyricsSuccess,
} from '@src/common/types';
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
    removeTake: (
      state: SongsSliceState,
      action: PayloadAction<RemoveTakePayload>,
    ) => {
      const songIndex = state.songs.findIndex(
        (song: song) => song.songId === action.payload.songId,
      );

      if (songIndex !== -1) {
        const takeIndex = state.songs[songIndex].takes.findIndex(
          (take: take) => take.takeId === action.payload.takeId,
        );

        if (takeIndex !== -1) {
          state.songs[songIndex].takes.splice(takeIndex, 1);
        }
      }
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
        console.warn(`Song with ID ${newTake.songId} not found`);
      }
    },
    fetchPageSuccess: (
      state: SongsSliceState,
      action: PayloadAction<fetchPageSuccessPayload>,
    ) => {
      const { page, songId } = action.payload;

      const songIndex = state.songs.findIndex(
        (song: song) => song.songId === songId,
      );

      if (songIndex !== -1) {
        state.songs[songIndex].page = page;
      } else {
        console.warn(`Song with ID ${songId} not found`);
      }
    },
    fetchPageFailure: (
      state: SongsSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.error = action.payload;
    },
    updateTakeNotesSuccess: (
      state: SongsSliceState,
      action: PayloadAction<UpdateTakeNotesSuccessPayload>,
    ) => {
      const { songId, takeId, notes } = action.payload;

      const songIndex = state.songs.findIndex(
        (song: song) => song.songId === songId,
      );

      if (songIndex !== -1) {
        const takeIndex = state.songs[songIndex].takes.findIndex(
          (take: take) => take.takeId === takeId,
        );

        if (takeIndex !== -1) {
          state.songs[songIndex].takes[takeIndex].notes = notes;
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
      )
      .addCase(at.UPDATE_LYRICS_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.updateLyricsSuccess,
        (
          state: SongsSliceState,
          action: PayloadAction<updateLyricsSuccess>,
        ) => {
          const { songId, lyrics } = action.payload;

          const songIndex = state.songs.findIndex(
            (song: song) => song.songId === songId,
          );

          state.isLoading = false;
          state.songs[songIndex].page.lyrics = lyrics;
        },
      )
      .addCase(
        ac.updateLyricsFailure,
        (state: SongsSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(at.UPDATE_PAGE_INFO_REQUEST, (state: SongsSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.updatePageInfoSuccess,
        (
          state: SongsSliceState,
          action: PayloadAction<UpdatePageInfoSuccess>,
        ) => {
          const { songId, info } = action.payload;

          const songIndex = state.songs.findIndex(
            (song: song) => song.songId === songId,
          );

          state.isLoading = false;
          state.songs[songIndex].page.info = info;
        },
      )
      .addCase(
        ac.updatePageInfoFailure,
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
  fetchPageSuccess,
  fetchPageFailure,
  updateTakeNotesSuccess,
} = songsSlice.actions;
