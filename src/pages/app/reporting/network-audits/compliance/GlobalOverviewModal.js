import React, { useState, useEffect, useCallback } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Icon } from '../../../../../components/Component';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
import { ComplianceDetailsModalBody } from './ComplianceWidget';
import classnames from 'classnames';
import { KPIsModalBody } from './KPIsWidget';
import { RegionalTopBottomScoreRow } from './Top10Bottom10List';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setGlobalOverviewMainActiveTab } from '../../../../../features/compliance/complianceDashboard';

const GlobalOverviewModal = ({ modalId, isOpen, toggleModal, modalTitle, published, data, selectedReport, setIsOpen, setReturnModalId }) => {
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
      bodyComponent={<GlobalOverviewModalBody data={data} selectedReport={selectedReport} setIsOpen={setIsOpen} />}
    />
  );
};

export default GlobalOverviewModal;

const GlobalOverviewModalBody = ({ data, selectedReport, setIsOpen }) => {
  const activeTab = useAppSelector((state) => state.complianceDashboard.globalOverviewMainActiveTabs.mainActiveTab);

  const dispatch = useAppDispatch();

  const setActiveTab = useCallback(
    (tab) => {
      return dispatch(setGlobalOverviewMainActiveTab(tab));
    },
    [dispatch]
  );

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === '1' })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle('1');
            }}
          >
            <Icon name="check-circle-cut" /> <span>Compliance</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === '2' })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle('2');
            }}
          >
            <Icon name="meter" /> <span>KPIs</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === '3' })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle('3');
            }}
          >
            <Icon name="building" /> <span>Sites</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ComplianceDetailsModalBody
            overallData={data.overall_compliance}
            firewallData={data.firewall_compliance}
            switchData={data.switch_compliance}
            wirelessData={data.wireless_compliance}
            passingScore={data.passing_score}
          />
        </TabPane>
        <TabPane tabId="2">
          <KPIsModalBody data={data} />
        </TabPane>
        <TabPane tabId="3">
          <Top10AndBottom10ModalBody selectedReport={selectedReport} setIsOpen={setIsOpen} data={data} />
        </TabPane>
      </TabContent>
    </>
  );
};

const Top10AndBottom10ModalBody = ({ selectedReport, setIsOpen, data }) => {
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
              <Top10AndBottom10ModalBodyColBlock
                selectedReport={selectedReport}
                setIsOpen={setIsOpen}
                passingScore={data.passing_score}
                published={data.published}
                top10Data={data.overall_top}
                bottom10Data={data.overall_bottom}
              />
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
              <Top10AndBottom10ModalBodyColBlock
                selectedReport={selectedReport}
                setIsOpen={setIsOpen}
                passingScore={data.passing_score}
                published={data.published}
                top10Data={data.firewall_top}
                bottom10Data={data.firewall_bottom}
              />
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
              <Top10AndBottom10ModalBodyColBlock
                selectedReport={selectedReport}
                setIsOpen={setIsOpen}
                passingScore={data.passing_score}
                published={data.published}
                top10Data={data.switch_top}
                bottom10Data={data.switch_bottom}
              />
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
              <Top10AndBottom10ModalBodyColBlock
                selectedReport={selectedReport}
                setIsOpen={setIsOpen}
                passingScore={data.passing_score}
                published={data.published}
                top10Data={data.wireless_top}
                bottom10Data={data.wireless_bottom}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Top10AndBottom10ModalBodyColBlock = ({ selectedReport, setIsOpen, passingScore, published, top10Data, bottom10Data }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <Nav tabs className="nav-tabs-card nav-tabs-xs">
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === '1' })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle('1');
            }}
          >
            Top 10
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeTab === '2' })}
            onClick={(ev) => {
              ev.preventDefault();
              toggle('2');
            }}
          >
            Bottom 5
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className={'overflow-hidden'}>
        <TabPane tabId="1">
          {top10Data.map((each, idx) => {
            return (
              <RegionalTopBottomScoreRow
                key={idx}
                siteData={each}
                passing_score={passingScore}
                published={published}
                isFullScreen={false}
                disableOptions={true}
                selectedReport={selectedReport}
                hidePrevModal={() => setIsOpen(false)}
              />
            );
          })}
        </TabPane>
        <TabPane tabId="2">
          {bottom10Data.map((each, idx) => {
            return (
              <RegionalTopBottomScoreRow
                key={idx}
                siteData={each}
                passing_score={passingScore}
                published={published}
                isFullScreen={false}
                disableOptions={true}
                selectedReport={selectedReport}
                hidePrevModal={() => setIsOpen(false)}
              />
            );
          })}
        </TabPane>
      </TabContent>
    </>
  );
};
