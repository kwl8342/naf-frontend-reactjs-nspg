import { createSlice } from '@reduxjs/toolkit';

const resultsDevicesModalSlice = createSlice({
  name: 'resultDevicesModal',
  initialState: {
    show: false,
    data: null
  },
  reducers: {
    showResultDevicesModal(state) {
      state.show = true;
    },
    hideResultDevicesModal(state) {
      state.show = false;
    },
    toggleResultDevicesModal(state) {
      state.show = !state.show;
    },
    setResultDevicesModalData(state, data) {
      state.data = data.payload;
    }
  }
});

export const { showResultDevicesModal, hideResultDevicesModal, toggleResultDevicesModal, setResultDevicesModalData } =
  resultsDevicesModalSlice.actions;
export default resultsDevicesModalSlice.reducer;
