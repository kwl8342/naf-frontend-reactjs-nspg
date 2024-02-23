import { configureStore } from '@reduxjs/toolkit';
import resultsKpisModalReducer from '../features/kpis/resultsKpisModal';
import resultsSitesModalReducer from '../features/sites/resultsSitesModal';
import resultsDevicesModalReducer from '../features/devices/resultsDevicesModal';
import resultsScoresModalReducer from '../features/scores/resultsScoresModal';
import complianceDashboardReducer from '../features/compliance/complianceDashboard';

export const store = configureStore({
  reducer: {
    resultKpisModal: resultsKpisModalReducer,
    resultSitesModal: resultsSitesModalReducer,
    resultDevicesModal: resultsDevicesModalReducer,
    resultScoresModal: resultsScoresModalReducer,
    complianceDashboard: complianceDashboardReducer
  }
});
