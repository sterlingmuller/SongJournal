import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FetchPageSuccessPayload,
  UpdateLyricsPayload,
  UpdatePageInfoPayload,
  SongToPageMap,
} from '@src/common/types';

type PagesSliceState = {
  items: SongToPageMap;
  isLoading: boolean;
  error: Error | null;
};

const initialState: PagesSliceState = {
  items: {},
  isLoading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    fetchPageRequest: (state: PagesSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPageSuccess: (
      state: PagesSliceState,
      action: PayloadAction<FetchPageSuccessPayload>,
    ) => {
      const { page, songId } = action.payload;
      state.items[songId] = page;
      state.isLoading = false;
      state.error = null;
    },
    fetchPageFailure: (
      state: PagesSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateLyricsRequest: (state: PagesSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    updateLyricsSuccess: (
      state: PagesSliceState,
      action: PayloadAction<UpdateLyricsPayload>,
    ) => {
      const { songId, lyrics } = action.payload;
      if (state.items[songId]) {
        state.items[songId].lyrics = lyrics;
      }
      state.isLoading = false;
      state.error = null;
    },
    updateLyricsFailure: (
      state: PagesSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePageInfoRequest: (state: PagesSliceState) => {
      state.isLoading = true;
      state.error = null;
    },
    updatePageInfoSuccess: (
      state: PagesSliceState,
      action: PayloadAction<UpdatePageInfoPayload>,
    ) => {
      const { songId, info } = action.payload;
      if (state.items[songId]) {
        state.items[songId].info = info;
      }
      state.isLoading = false;
      state.error = null;
    },
    updatePageInfoFailure: (
      state: PagesSliceState,
      action: PayloadAction<Error>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  updateLyricsRequest,
  updateLyricsSuccess,
  updateLyricsFailure,
  updatePageInfoRequest,
  updatePageInfoSuccess,
  updatePageInfoFailure,
} = pagesSlice.actions;

export default pagesSlice.reducer;
