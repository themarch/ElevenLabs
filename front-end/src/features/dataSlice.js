import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updateData: {
    refreshStats: false,
  }
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setInitial: (state, action) => {
      Object.keys(action.payload).forEach(function (element, i) {
        state.updateData[Object.keys(action.payload)[i]] = action.payload[element]
      });
    },
  },
  extraReducers: (builder) => {
  },
});

export const { setInitial } = dataSlice.actions;

export const getSlice = (state) => state.dataSlice;

export default dataSlice.reducer;