import { createSlice } from "@reduxjs/toolkit";
import { mockData } from "components/constants";

interface ICounter {
  count: number;
  mockData: Object;
  searchKey: string;
  pageIndex: number,
  pageSize: number,
}

const initialState: ICounter = {
  count: 20,
  mockData: mockData.data,
  searchKey: '',
  pageIndex: 1,
  pageSize: 10,
};

const mockDataSlice = createSlice({
  name: "mockData",
  initialState,
  reducers: {
    handleSearch: (state , action) => {
      state.mockData = action.payload.mockData;
      state.searchKey = action.payload.searchKey;
    },
    handlePageIndexChange: (state, action) => {
      state.pageIndex = action.payload
    }
  },
});

export const { handleSearch,handlePageIndexChange } = mockDataSlice.actions;

export default mockDataSlice.reducer;
