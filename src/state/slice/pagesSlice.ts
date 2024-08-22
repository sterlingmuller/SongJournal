import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FetchPageSuccessPayload,
  UpdateLyricsPayload,
  SongToPageMap,
  UpdatePageInfoStatePayload,
} from '@src/components/common/types';

type PagesSliceState = {
  items: SongToPageMap;
};

const initialState: PagesSliceState = {
  items: {},
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    fetchPageSuccess: (
      state: PagesSliceState,
      action: PayloadAction<FetchPageSuccessPayload>,
    ) => {
      const { page, songId } = action.payload;
      state.items[songId] = page;
    },
    updateLyrics: (
      state: PagesSliceState,
      action: PayloadAction<UpdateLyricsPayload>,
    ) => {
      const { songId, lyrics } = action.payload;
      if (state.items[songId]) {
        state.items[songId].lyrics = lyrics;
      }
    },
    UpdatePageInfo: (
      state: PagesSliceState,
      action: PayloadAction<UpdatePageInfoStatePayload>,
    ) => {
      const { songId, info } = action.payload;
      if (state.items[songId]) {
        state.items[songId].info = info;
      }
    },
  },
});

export const { fetchPageSuccess, updateLyrics, UpdatePageInfo } =
  pagesSlice.actions;

export default pagesSlice.reducer;
