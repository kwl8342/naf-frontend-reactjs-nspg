import { createSlice } from '@reduxjs/toolkit';

const resultsSitesModalSlice = createSlice({
  name: 'resultSitesModal',
  initialState: {
    show: false,
    data: null
  },
  reducers: {
    showResultSitesModal(state) {
      state.show = true;
    },
    hideResultSitesModal(state) {
      state.show = false;
    },
    toggleResultSitesModal(state) {
      state.show = !state.show;
    },
    setResultSitesModalData(state, data) {
      state.data = data.payload;
    }
  }
});

export const { showResultSitesModal, hideResultSitesModal, toggleResultSitesModal, setResultSitesModalData } = resultsSitesModalSlice.actions;
export default resultsSitesModalSlice.reducer;
