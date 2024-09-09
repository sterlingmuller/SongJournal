import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FetchPageSuccessPayload,
  UpdateLyricsStatePayload,
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
    updateLyricsSuccess: (
      state: PagesSliceState,
      action: PayloadAction<UpdateLyricsStatePayload>,
    ) => {
      const { songId, lyrics } = action.payload;
      if (state.items[songId]) {
        state.items[songId].lyrics = lyrics;
      }
    },
    updatePageInfoSuccess: (
      state: PagesSliceState,
      action: PayloadAction<UpdatePageInfoStatePayload>,
    ) => {
      const { songId, info } = action.payload;
      if (state.items[songId]) {
        state.items[songId].info = {
          ...state.items[songId].info,
          ...info,
        };
      }
    },
  },
});

export const { fetchPageSuccess, updateLyricsSuccess, updatePageInfoSuccess } =
  pagesSlice.actions;

export default pagesSlice.reducer;
