import React, { useState } from 'react';
import Content from '../../../../../layout/content/Content';
import Head from '../../../../../layout/head/Head';
import PageHeader from '../../../../components/mondelez/PageHeader';
import DownloadNetworkReport from '../../../../components/mondelez/DownloadNetworkReport';
import ComplianceBody from './ComplianceBody';
import ReportSettings from './ReportSettings';
import PreviousReportDropdown from './PreviousReportDropdown';
import ComplianceModals from './ComplianceModals';

const Compliance = () => {
  const complianceChartSettings = JSON.parse(window.localStorage.getItem('complianceChartSettings'));

  const [isChartSettingsModalOpen, setIsChartSettingsModalOpen] = useState(null);
  const [previousReportSelectorData, setPreviousReportSelectorData] = useState([]);

  const [selectedReportPublished, setSelectedReportPublished] = useState(null);
  const [selectedReport, setSelectedReport] = useState(complianceChartSettings ? complianceChartSettings.reportId : null);
  const [startDate, setStartDate] = useState(complianceChartSettings ? new Date(complianceChartSettings.startDate) : null);
  const [endDate, setEndDate] = useState(complianceChartSettings ? new Date(complianceChartSettings.endDate) : null);
  const [selectedFrequency, setSelectedFrequency] = useState(complianceChartSettings ? complianceChartSettings.frequency : 'monthly');

  const [globalData, setGlobalData] = useState(null);
  const [regionalData, setRegionalData] = useState(null);

  const [siteType, setSiteType] = useState(null);

  const toggleChartSettings = () => setIsChartSettingsModalOpen(!isChartSettingsModalOpen);

  const [isTop10ModalOpen, setIsTop10ModalOpen] = useState(false);
  const [isBottom10ModalOpen, setIsBottom10ModalOpen] = useState(false);
  const [isComplianceDetailsModalOpen, setIsComplianceDetailsModalOpen] = useState(false);
  const [isRegionalResultsModalOpen, setIsRegionalResultsModalOpen] = useState(false);
  const [isGlobalOverviewModalOpen, setIsGlobalOverviewModalOpen] = useState(false);
  const [isKpisModalOpen, setIsKpisModalOpen] = useState(false);

  const toggleTop10Modal = () => setIsTop10ModalOpen(!isTop10ModalOpen);
  const toggleBottom10Modal = () => setIsBottom10ModalOpen(!isBottom10ModalOpen);
  const toggleRegionalResultsModal = () => setIsRegionalResultsModalOpen(!isRegionalResultsModalOpen);
  const toggleGlobalOverviewModal = () => setIsGlobalOverviewModalOpen(!isGlobalOverviewModalOpen);
  const toggleKpisModal = () => setIsKpisModalOpen(!isKpisModalOpen);
  const toggleComplianceDetailsModal = () => {
    setIsComplianceDetailsModalOpen(!isComplianceDetailsModalOpen);
  };

  return (
    <React.Fragment>
      <Head title="Network Audits Compliance"></Head>
      <Content>
        <PageHeader
          title={'Network Audits Compliance'}
          description={'Regional Network Audit Scores including Top/Bottom 10 Sites'}
          tools={
            <>
              {previousReportSelectorData.length > 0 ? (
                <PreviousReportDropdown
                  previousReportSelectorData={previousReportSelectorData}
                  selectedReport={selectedReport}
                  setSelectedReport={setSelectedReport}
                />
              ) : (
                ''
              )}
              {selectedReport && selectedReportPublished ? (
                <DownloadNetworkReport
                  selectedReportId={selectedReport}
                  selectedReportPublished={selectedReportPublished}
                  baseExportUrl={'/core/compliance/export'}
                />
              ) : (
                ''
              )}
            </>
          }
          moreTools={
            <li>
              <a
                href="#chartSettings"
                id="chartSettingsBtn"
                onClick={(e) => {
                  e.preventDefault();
                  toggleChartSettings();
                }}
              >
                <em className="icon ni ni-setting"></em>Chart Settings
              </a>
            </li>
          }
        />
        {selectedReport ? (
          <ReportSettings
            isChartSettingsModalOpen={isChartSettingsModalOpen}
            toggleChartSettings={toggleChartSettings}
            options={{
              title: 'Chart Settings',
              modalId: 'modalComplianceChartSettings',
              inputIdExtension: 'compliance',
              disableSsidSelector: true,
              enableFrequencySelector: true,
              enablePreviousReportSelector: true,
              footerText: 'Compliance Chart Settings',
              previousReportSelectorData: previousReportSelectorData
            }}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedFrequency={selectedFrequency}
            setSelectedFrequency={setSelectedFrequency}
            globalData={globalData}
          />
        ) : (
          ''
        )}

        <ComplianceBody
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          setSelectedReportPublished={setSelectedReportPublished}
          setPreviousReportSelectorData={setPreviousReportSelectorData}
          startDate={startDate}
          endDate={endDate}
          selectedFrequency={selectedFrequency}
          globalData={globalData}
          setGlobalData={setGlobalData}
          regionalData={regionalData}
          setRegionalData={setRegionalData}
          setSiteType={setSiteType}
          setIsTop10ModalOpen={setIsTop10ModalOpen}
          setIsBottom10ModalOpen={setIsBottom10ModalOpen}
          setIsComplianceDetailsModalOpen={setIsComplianceDetailsModalOpen}
          toggleRegionalResultsModal={toggleRegionalResultsModal}
          toggleGlobalOverviewModal={toggleGlobalOverviewModal}
          toggleKpisModal={toggleKpisModal}
        />
        <ComplianceModals
          selectedReport={selectedReport}
          startDate={startDate}
          endDate={endDate}
          selectedFrequency={selectedFrequency}
          siteType={siteType}
          globalData={globalData}
          isTop10ModalOpen={isTop10ModalOpen}
          setIsTop10ModalOpen={setIsTop10ModalOpen}
          toggleTop10Modal={toggleTop10Modal}
          isBottom10ModalOpen={isBottom10ModalOpen}
          setIsBottom10ModalOpen={setIsBottom10ModalOpen}
          toggleBottom10Modal={toggleBottom10Modal}
          isComplianceDetailsModalOpen={isComplianceDetailsModalOpen}
          toggleComplianceDetailsModal={toggleComplianceDetailsModal}
          isRegionalResultsModalOpen={isRegionalResultsModalOpen}
          toggleRegionalResultsModal={toggleRegionalResultsModal}
          isGlobalOverviewModalOpen={isGlobalOverviewModalOpen}
          setIsGlobalOverviewModalOpen={setIsGlobalOverviewModalOpen}
          toggleGlobalOverviewModal={toggleGlobalOverviewModal}
          isKpisModalOpen={isKpisModalOpen}
          toggleKpisModal={toggleKpisModal}
        />
      </Content>
    </React.Fragment>
  );
};

export default Compliance;
