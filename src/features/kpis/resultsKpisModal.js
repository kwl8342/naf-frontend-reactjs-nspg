import { createSlice } from '@reduxjs/toolkit';

const resultsKpisModalSlice = createSlice({
  name: 'resultKpisModal',
  initialState: {
    show: false,
    data: null
  },
  reducers: {
    showResultKpisModal(state) {
      state.show = true;
    },
    hideResultKpisModal(state) {
      state.show = false;
    },
    toggleResultKpisModal(state) {
      state.show = !state.show;
    },
    setResultkpisModalData(state, data) {
      state.data = data.payload;
    }
  }
});

export const { showResultKpisModal, hideResultKpisModal, toggleResultKpisModal, setResultkpisModalData } = resultsKpisModalSlice.actions;
export default resultsKpisModalSlice.reducer;
