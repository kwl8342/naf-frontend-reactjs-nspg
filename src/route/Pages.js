import React, { Suspense, useLayoutEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RedirectAs404 } from '../utils/Utils';
import PrivateRoute from './PrivateRoute';

import Homepage from '../pages/Homepage';
import ExecutiveSummary from '../pages/app/monitoring/ExecutiveSummary';
import SolarWinds from '../pages/app/monitoring/dashboards/SolarWinds';
import AssetsHardware from '../pages/app/reporting/assets/Hardware';
import AssetsSites from '../pages/app/reporting/assets/Sites';
import CiscoDNACenterAccessPoints from '../pages/app/reporting/cisco-dna-center/AccessPoints';
import CiscoDNACenterClientDetails from '../pages/app/reporting/cisco-dna-center/ClientDetails';
import NetworkAuditsCompliance from '../pages/app/reporting/network-audits/compliance/Compliance';
import NetworkAuditsInfrastructure from '../pages/app/reporting/network-audits/Infrastructure';
import NetworkAuditsResultsDevices from '../pages/app/reporting/network-audits/results/devices/Devices';
import NetworkAuditsResultsScores from '../pages/app/reporting/network-audits/results/scores/Scores';
import NetworkAuditsResultsSites from '../pages/app/reporting/network-audits/results/sites/Sites';
import NetworkAuditsKPIs from '../pages/app/reporting/network-audits/kpis/KPIs';
import NetworkAuditsReports from '../pages/app/reporting/network-audits/Reports';
import WirelessEndpointClientCount from '../pages/app/reporting/wireless/EndpointClientCount';
import WirelessPerformanceDashboard from '../pages/app/reporting/wireless/PerformanceDashboard';
import WirelessStats from '../pages/app/reporting/wireless/Stats';
import ZPA from '../pages/app/monitoring/dashboards/ZPA';
import InfrastructureInventory from '../pages/app/planning/automation/InfrastructureInventory';
import ProductionSupport from '../pages/app/planning/automation/ProductionSupport';

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<Homepage />}>
      <Switch>
        {/*Dashboards*/}
        <PrivateRoute exact path={`/`} component={Homepage} />
        <PrivateRoute exact path={`/executive-summary`} component={ExecutiveSummary} />
        <PrivateRoute exact path={`/dashboards/solarwinds`} component={SolarWinds} />
        <PrivateRoute exact path={`/dashboards/zpa`} component={ZPA} />
        <PrivateRoute exact path={`/automation/infrastructure-inventory`} component={InfrastructureInventory} />
        <PrivateRoute exact path={`/automation/production-support`} component={ProductionSupport} />
        <PrivateRoute exact path={`/assets/hardware`} component={AssetsHardware} />
        <PrivateRoute exact path={`/assets/sites`} component={AssetsSites} />
        <PrivateRoute exact path={`/cisco-dna-center/access-points`} component={CiscoDNACenterAccessPoints} />
        <PrivateRoute exact path={`/cisco-dna-center/client-details`} component={CiscoDNACenterClientDetails} />
        <PrivateRoute exact path={`/network-audits/compliance`} component={NetworkAuditsCompliance} />
        <PrivateRoute exact path={`/network-audits/infrastructure`} component={NetworkAuditsInfrastructure} />
        <PrivateRoute exact path={`/network-audits/results/devices`} component={NetworkAuditsResultsDevices} showHistoryBtn={true} />
        <PrivateRoute exact path={`/network-audits/results/devices/history`} component={NetworkAuditsResultsDevices} />
        <PrivateRoute exact path={`/network-audits/results/scores`} component={NetworkAuditsResultsScores} showHistoryBtn={true} />
        <PrivateRoute exact path={`/network-audits/results/scores/history`} component={NetworkAuditsResultsScores} />
        <PrivateRoute exact path={`/network-audits/results/sites`} component={NetworkAuditsResultsSites} showHistoryBtn={true} />
        <PrivateRoute exact path={`/network-audits/results/sites/history`} component={NetworkAuditsResultsSites} />
        <PrivateRoute exact path={`/network-audits/kpis`} component={NetworkAuditsKPIs} />
        <PrivateRoute exact path={`/network-audits/reports`} component={NetworkAuditsReports} />
        <PrivateRoute exact path={`/wireless/endpoint-client-count`} component={WirelessEndpointClientCount} />
        <PrivateRoute exact path={`/wireless/performance-dashboard`} component={WirelessPerformanceDashboard} />
        <PrivateRoute exact path={`/wireless/stats`} component={WirelessStats} />
        <Route component={RedirectAs404} />
      </Switch>
    </Suspense>
  );
};
export default Pages;
