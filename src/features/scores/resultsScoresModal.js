import { createSlice } from '@reduxjs/toolkit';

const resultsScoresModalSlice = createSlice({
  name: 'resultScoresModal',
  initialState: {
    show: false,
    data: null
  },
  reducers: {
    showResultScoresModal(state) {
      state.show = true;
    },
    hideResultScoresModal(state) {
      state.show = false;
    },
    toggleResultScoresModal(state) {
      state.show = !state.show;
    },
    setResultScoresModalData(state, data) {
      state.data = data.payload;
    }
  }
});

export const { showResultScoresModal, hideResultScoresModal, toggleResultScoresModal, setResultScoresModalData } = resultsScoresModalSlice.actions;
export default resultsScoresModalSlice.reducer;
