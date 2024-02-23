import React from 'react';
import ResultsModal from '../../../../components/mondelez/ResultsModal';

const ComplianceWidget = ({ data, passingScore, setIsComplianceDetailsModalOpen }) => {
  return (
    <div className="card card-bordered h-100">
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Compliance</h6>
          </div>
          <div className="card-tools">
            <a
              href="#viewAll"
              className="link"
              onClick={(e) => {
                e.preventDefault();
                setIsComplianceDetailsModalOpen(true);
              }}
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <ComplianceWidgetTable data={data} passingScore={passingScore} />
    </div>
  );
};

export default ComplianceWidget;

const ComplianceWidgetTable = ({ data, passingScore }) => {
  return (
    <div className="nk-tb-list is-loose traffic-channel-table">
      <div className="nk-tb-item nk-tb-head">
        <div className="nk-tb-col nk-tb-channel">Site Type</div>
        <div className="nk-tb-col nk-tb-sessions text-right">Score</div>
      </div>
      {data.map((each, idx) => {
        if (idx >= 10) {
          return <></>;
        }
        const textColor = each.score >= passingScore ? 'text-success' : 'text-danger';

        return (
          <div className="nk-tb-item" key={idx}>
            <div className="nk-tb-col nk-tb-channel">
              <span className="tb-lead">{each.site_type}</span>
            </div>
            <div className="nk-tb-col nk-tb-sessions">
              <span className={`tb-sub tb-amount text-right ${textColor}`}>{each.score}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ComplianceDetailsModal = ({
  modalId,
  isOpen,
  toggleModal,
  modalTitle,
  overallData,
  firewallData,
  switchData,
  wirelessData,
  passingScore,
  published
}) => {
  return (
    <ResultsModal
      className={'modal-grafana-iframe'}
      style={{ maxWidth: '1120px' }}
      modalId={modalId}
      isOpen={isOpen}
      toggleModal={toggleModal}
      modalTitle={modalTitle}
      modalSubtitle={`Published: ${published}`}
      bodyComponent={
        <>
          <ComplianceDetailsModalBody
            overallData={overallData}
            firewallData={firewallData}
            switchData={switchData}
            wirelessData={wirelessData}
            passingScore={passingScore}
          />
        </>
      }
    />
  );
};

export const ComplianceDetailsModalBody = ({ overallData, firewallData, switchData, wirelessData, passingScore }) => {
  return (
    <div class="nk-block">
      <div class="row g-2">
        <div class="col-md-6 col-xxl-3">
          <ModalCardBody title={'Overall'} complianceData={overallData} passingScore={passingScore} />
        </div>
        <div class="col-md-6 col-xxl-3">
          <ModalCardBody title={'Firewall'} complianceData={firewallData} passingScore={passingScore} />
        </div>
        <div class="col-md-6 col-xxl-3">
          <ModalCardBody title={'Switch'} complianceData={switchData} passingScore={passingScore} />
        </div>
        <div class="col-md-6 col-xxl-3">
          <ModalCardBody title={'Wireless'} complianceData={wirelessData} passingScore={passingScore} />
        </div>
      </div>
    </div>
  );
};

const ModalCardBody = ({ title, complianceData, passingScore }) => {
  return (
    <div className="card card-bordered pricing">
      <div className="pricing-head">
        <div className="pricing-title">
          <h4 className="card-title title">{title}</h4>
        </div>
      </div>
      <ComplianceWidgetTable data={complianceData} passingScore={passingScore} />
    </div>
  );
};
