import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import {
  UpdatePageInfoSuccess,
  fetchPageSuccessPayload,
  page,
  updateLyricsSuccess,
} from '@src/common/types';
import * as ac from '@src/sagas/actionCreators';
import * as at from '@src/sagas/actionTypes';

type PagesSliceState = {
  items: page[];
  isLoading: boolean;
  error: Error | null;
};

const initialState: PagesSliceState = {
  items: [],
  isLoading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    fetchPageSuccess: (
      state: PagesSliceState,
      action: PayloadAction<fetchPageSuccessPayload>,
    ) => {
      const { page, songId } = action.payload;

      state.items[songId] = page;
    },
    fetchPageFailure: (
      state: PagesSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PagesSliceState>) => {
    builder
      .addCase(at.UPDATE_LYRICS_REQUEST, (state: PagesSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.updateLyricsSuccess,
        (
          state: PagesSliceState,
          action: PayloadAction<updateLyricsSuccess>,
        ) => {
          const { songId, lyrics } = action.payload;

          state.isLoading = false;
          state.items[songId].lyrics = lyrics;
        },
      )
      .addCase(
        ac.updateLyricsFailure,
        (state: PagesSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(at.UPDATE_PAGE_INFO_REQUEST, (state: PagesSliceState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        ac.updatePageInfoSuccess,
        (
          state: PagesSliceState,
          action: PayloadAction<UpdatePageInfoSuccess>,
        ) => {
          const { songId, info } = action.payload;

          state.isLoading = false;
          state.items[songId].info = info;
        },
      )
      .addCase(
        ac.updatePageInfoFailure,
        (state: PagesSliceState, action: PayloadAction<Error>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default pagesSlice.reducer;
export const { fetchPageSuccess, fetchPageFailure } = pagesSlice.actions;
