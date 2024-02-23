import { createSlice } from '@reduxjs/toolkit';

const complianceDashboardSlice = createSlice({
  name: 'complianceDashboard',
  initialState: {
    globalOverviewMainActiveTabs: {
      mainActiveTab: '1',
      kipsOverall: '2'
    }
  },
  reducers: {
    setGlobalOverviewMainActiveTab(state, data) {
      state.globalOverviewMainActiveTabs.mainActiveTab = data.payload;
    },
    setGlobalOverviewKpisOverallActiveTab(state, data) {
      state.globalOverviewMainActiveTabs.kipsOverall = data.payload;
    }
  }
});

export const { setGlobalOverviewMainActiveTab, setGlobalOverviewKpisOverallActiveTab } = complianceDashboardSlice.actions;
export default complianceDashboardSlice.reducer;
