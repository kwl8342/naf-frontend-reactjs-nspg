import React, { useState, useEffect } from 'react';
import ScoresModal from '../results/scores/ScoresModal';
import CommonModalForTop10Bottom10 from './CommonModalForTop10Bottom10';
import { useAppSelector } from '../../../../../app/hooks';
import { ComplianceDetailsModal } from './ComplianceWidget';
import RegionalResultsModal from './RegionalResultsModal';
import GlobalOverviewModal from './GlobalOverviewModal';
import { KPIsModal } from './KPIsWidget';

const ComplianceModals = ({
  selectedReport,
  startDate,
  endDate,
  selectedFrequency,
  siteType,
  globalData,
  isTop10ModalOpen,
  setIsTop10ModalOpen,
  toggleTop10Modal,
  isBottom10ModalOpen,
  setIsBottom10ModalOpen,
  toggleBottom10Modal,
  isComplianceDetailsModalOpen,
  toggleComplianceDetailsModal,
  isRegionalResultsModalOpen,
  toggleRegionalResultsModal,
  isGlobalOverviewModalOpen,
  setIsGlobalOverviewModalOpen,
  toggleGlobalOverviewModal,
  isKpisModalOpen,
  toggleKpisModal
}) => {
  const [returnModalId, setReturnModalId] = useState(null);

  const isScoresModalOpen = useAppSelector((state) => state.resultScoresModal.show);

  useEffect(() => {
    if (!isScoresModalOpen) {
      if (returnModalId === 'modalTop10SitesDetails') {
        setIsTop10ModalOpen(true);
        setReturnModalId(null);
      } else if (returnModalId === 'modalBottom10SitesDetails') {
        setIsBottom10ModalOpen(true);
        setReturnModalId(null);
      } else if (returnModalId === 'modalGlobalOverviewDetails') {
        setIsGlobalOverviewModalOpen(true);
        setReturnModalId(null);
      }
    }
    // eslint-disable-next-line
  }, [isScoresModalOpen]);

  return (
    <>
      <ScoresModal siteType={siteType} />
      {globalData ? (
        <>
          <CommonModalForTop10Bottom10
            modalId={'modalTop10SitesDetails'}
            isOpen={isTop10ModalOpen}
            setIsOpen={setIsTop10ModalOpen}
            toggleModal={toggleTop10Modal}
            modalTitle={'Top 10'}
            overallData={globalData.overall_top}
            firewallData={globalData.firewall_top}
            switchData={globalData.switch_top}
            wirelessData={globalData.wireless_top}
            passing_score={globalData.passing_score}
            published={globalData.published}
            selectedReport={selectedReport}
            setReturnModalId={setReturnModalId}
          />
          <CommonModalForTop10Bottom10
            modalId={'modalBottom10SitesDetails'}
            isOpen={isBottom10ModalOpen}
            setIsOpen={setIsBottom10ModalOpen}
            toggleModal={toggleBottom10Modal}
            modalTitle={'Bottom 10'}
            overallData={globalData.overall_bottom}
            firewallData={globalData.firewall_bottom}
            switchData={globalData.switch_bottom}
            wirelessData={globalData.wireless_bottom}
            passing_score={globalData.passing_score}
            published={globalData.published}
            selectedReport={selectedReport}
            setReturnModalId={setReturnModalId}
          />

          <ComplianceDetailsModal
            modalId={'modalComplianceDetails'}
            isOpen={isComplianceDetailsModalOpen}
            toggleModal={toggleComplianceDetailsModal}
            modalTitle={'Compliance'}
            overallData={globalData.overall_compliance}
            firewallData={globalData.firewall_compliance}
            switchData={globalData.switch_compliance}
            wirelessData={globalData.wireless_compliance}
            passingScore={globalData.passing_score}
            published={globalData.published}
          />

          <RegionalResultsModal
            modalId={'regionalResultsChartModal'}
            isOpen={isRegionalResultsModalOpen}
            toggleModal={toggleRegionalResultsModal}
            modalTitle={'Regional Results'}
            published={globalData.published}
            selectedReport={selectedReport}
            startDate={startDate}
            endDate={endDate}
            selectedFrequency={selectedFrequency}
          />
          <GlobalOverviewModal
            modalId={'modalGlobalOverviewDetails'}
            isOpen={isGlobalOverviewModalOpen}
            setIsOpen={setIsGlobalOverviewModalOpen}
            toggleModal={toggleGlobalOverviewModal}
            modalTitle={'Global Overview'}
            published={globalData.published}
            data={globalData}
            selectedReport={selectedReport}
            setReturnModalId={setReturnModalId}
          />

          <KPIsModal
            modalId={'modalKPIsDetails'}
            isOpen={isKpisModalOpen}
            toggleModal={toggleKpisModal}
            modalTitle={'KPIs'}
            published={globalData.published}
            data={globalData}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default ComplianceModals;
