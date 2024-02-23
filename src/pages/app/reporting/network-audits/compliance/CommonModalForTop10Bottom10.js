import React, { useEffect } from 'react';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
import { RegionalTopBottomScoreRow } from './Top10Bottom10List';
import { useAppSelector } from '../../../../../app/hooks';

const CommonModalForTop10Bottom10 = ({
  modalId,
  isOpen,
  setIsOpen,
  toggleModal,
  modalTitle,
  overallData,
  firewallData,
  switchData,
  wirelessData,
  passing_score,
  published,
  selectedReport,
  setReturnModalId
}) => {
  const isScoresModalOpen = useAppSelector((state) => state.resultScoresModal.show);

  useEffect(() => {
    if (!isOpen && isScoresModalOpen) {
      setReturnModalId(modalId);
    }
    // eslint-disable-next-line
  }, [isOpen]);

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
          <Top10OrBottom10ModalBody
            overallData={overallData}
            firewallData={firewallData}
            switchData={switchData}
            wirelessData={wirelessData}
            passing_score={passing_score}
            published={published}
            selectedReport={selectedReport}
            setIsOpen={setIsOpen}
          />
        </>
      }
    />
  );
};

export default CommonModalForTop10Bottom10;

const Top10OrBottom10ModalBody = ({ overallData, firewallData, switchData, wirelessData, passing_score, published, selectedReport, setIsOpen }) => {
  return (
    <div className="">
      <div className="row g-2">
        <div className="col-md-6 col-xxl-3">
          <div className="card card-bordered card-full">
            <div className="pricing-head">
              <div className="pricing-title">
                <h4 className="card-title title">Overall</h4>
              </div>
            </div>
            <div className="card-inner-group top-bottom-container">
              {overallData.map((each, idx) => {
                return (
                  <RegionalTopBottomScoreRow
                    key={idx}
                    siteData={each}
                    passing_score={passing_score}
                    published={published}
                    isFullScreen={false}
                    disableOptions={true}
                    selectedReport={selectedReport}
                    hidePrevModal={() => setIsOpen(false)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xxl-3">
          <div className="card card-bordered card-full">
            <div className="pricing-head">
              <div className="pricing-title">
                <h4 className="card-title title">Firewall</h4>
              </div>
            </div>
            <div className="card-inner-group top-bottom-container" data-siteType="Firewall">
              {firewallData.map((each, idx) => {
                return (
                  <RegionalTopBottomScoreRow
                    key={idx}
                    siteData={each}
                    passing_score={passing_score}
                    published={published}
                    isFullScreen={false}
                    disableOptions={true}
                    selectedReport={selectedReport}
                    hidePrevModal={() => setIsOpen(false)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xxl-3">
          <div className="card card-bordered card-full">
            <div className="pricing-head">
              <div className="pricing-title">
                <h4 className="card-title title">Switch</h4>
              </div>
            </div>
            <div className="card-inner-group top-bottom-container" data-siteType="Switch">
              {switchData.map((each, idx) => {
                return (
                  <RegionalTopBottomScoreRow
                    key={idx}
                    siteData={each}
                    passing_score={passing_score}
                    published={published}
                    isFullScreen={false}
                    disableOptions={true}
                    selectedReport={selectedReport}
                    hidePrevModal={() => setIsOpen(false)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xxl-3">
          <div className="card card-bordered card-full">
            <div className="pricing-head">
              <div className="pricing-title">
                <h4 className="card-title title">Wireless</h4>
              </div>
            </div>
            <div className="card-inner-group top-bottom-container" data-siteType="Wireless">
              {wirelessData.map((each, idx) => {
                return (
                  <RegionalTopBottomScoreRow
                    key={idx}
                    siteData={each}
                    passing_score={passing_score}
                    published={published}
                    isFullScreen={false}
                    disableOptions={true}
                    selectedReport={selectedReport}
                    hidePrevModal={() => setIsOpen(false)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* const Top10Bottom10Row = ({ data, disableOptions }) => {

    return (
        <div className={`${fullScreen === true ? 'card-inner-essw py-1' : 'card-inner card-inner-md'}`}
            style={fullScreen === true ? { borderBottom: "1px solid #e3d0f1" } : {}}>
            <div className="user-card">
                <div className={`user-avatar bg-${data.site__region.toLowerCase()}`}>
                    <OverlayTrigger
                        key={'left'}
                        placement={'left'}
                        delay={{ show: 250, hide: 0 }}
                        overlay={
                            <Tooltip arrow={true}>
                                <ul style={{ listStyle: 'none' }}>
                                    <li>Passing Score: {data.passing_score}</li>
                                    <li>Published on: {data.published}</li>
                                </ul>
                            </Tooltip>
                        }
                    >
                        <span>{data.score}</span>
                    </OverlayTrigger>
                </div>

                <div className="user-info">
                    <span className="lead-text" style={{ cursor: "pointer" }} data-ipamCode={data.site__ipam_code} data-ssid={ssid} data-region={
                        data.site__region
                    }>{data.site__region} - {data.site__ipam_code}: {data.site__name}</span>
                    {
                        data.site__type === ''
                            ? <span className="sub-text">{data.site__country}</span>
                            : <span className="sub-text">{data.site__type}, {data.site__country}</span>
                    }
                </div>
                {
                    disableOptions
                        ? ''
                        : <div className="user-action">
                            <div className="drodown">
                                <a href="#" className="dropdown-toggle btn btn-icon btn-trigger mr-n1"
                                    data-toggle="dropdown" aria-expanded="false"><em
                                        className="icon ni ni-more-h"></em></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="link-list-opt no-bdr">
                                        {
                                            disableOptions ?
                                                <>
                                                    <li>
                                                        <a className="disabled-link">
                                                            <em className="icon ni ni-dashboard"></em>
                                                            <span>Dashboard</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="disabled-link">
                                                            <em className="icon ni ni-shield-alert"></em>
                                                            <span>Device results</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="disabled-link">
                                                            <em className="icon ni ni-shield-alert"></em>
                                                            <span>Site results</span>
                                                        </a>
                                                    </li>
                                                </>
                                                :
                                                <>
                                                    <li>
                                                        <a href={`../../network-audits/dashboard?ipam_code=${data.site__ipam_code}`} target="_blank">
                                                            <em className="icon ni ni-dashboard"></em>
                                                            <span>Dashboard</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="../../network-audits/results/devices" target="_blank">
                                                            <em className="icon ni ni-shield-alert"></em>
                                                            <span>Device results</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="../../network-audits/results/sites" target="_blank">
                                                            <em className="icon ni ni-shield-alert"></em>
                                                            <span>Site results</span>
                                                        </a>
                                                    </li>
                                                </>
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div >
    )
} */
