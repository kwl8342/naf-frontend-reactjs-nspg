import React, { useState } from 'react';
import { Icon } from '../../../../../components/Component';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
// import { Progress } from "reactstrap";
// import Tooltip from 'react-bootstrap/Tooltip';

const KPIsWidget = ({ top5Data, middle5Data, bottom5Data, passingScore, title, addBorder, fullScreen, containerExt, toggleKpisModal }) => {
  return (
    <div className={`card pricing ${addBorder === false ? '' : 'card-bordered'}`}>
      {title ? (
        <div className="pricing-head">
          <div className="pricing-title">
            <h4 className="card-title title">{title}</h4>
          </div>
        </div>
      ) : (
        <div className="card-inner mb-n2">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">KPIs</h6>
            </div>
            <div className="card-tools">
              <a
                href="#viewAll"
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleKpisModal();
                }}
              >
                View All
              </a>
            </div>
          </div>
        </div>
      )}

      <KPIsWidgetBody top5Data={top5Data} middle5Data={middle5Data} bottom5Data={bottom5Data} passingScore={passingScore} />
    </div>
  );
};

export default KPIsWidget;

const KPIsWidgetBody = ({ type, top5Data, middle5Data, bottom5Data, passingScore }) => {
  const [activeTab, setActiveTab] = useState('2');

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
            Top 5
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
            Middle Range 5
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
            Bottom 5
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className={'overflow-hidden'}>
        <TabPane tabId="1">
          <div className="nk-tb-list is-loose">
            {top5Data.length > 0 ? (
              <>
                <TabPaneTableHeadRow />
                <TabPaneTableBodyRows data={top5Data} passingScore={passingScore} />
              </>
            ) : (
              ''
            )}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="nk-tb-list is-loose">
            {middle5Data.length > 0 ? (
              <>
                <TabPaneTableHeadRow />
                <TabPaneTableBodyRows data={middle5Data} passingScore={passingScore} />
              </>
            ) : (
              ''
            )}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="nk-tb-list is-loose">
            {bottom5Data.length > 0 ? (
              <>
                <TabPaneTableHeadRow />
                <TabPaneTableBodyRows data={bottom5Data} passingScore={passingScore} />
              </>
            ) : (
              ''
            )}
          </div>
        </TabPane>
      </TabContent>
    </>
  );
};

const TabPaneTableHeadRow = () => {
  return (
    <div className="nk-tb-item nk-tb-head">
      <div className="nk-tb-col">
        <span>Question</span>
      </div>
      <div className="nk-tb-col text-right">
        <span>Score</span>
      </div>
      <div className="nk-tb-col" style={{ minWidth: '7rem' }}>
        <span>Passing</span>
      </div>
      <div className="nk-tb-col tb-col-sm text-right">
        <span>Impact</span>
      </div>
    </div>
  );
};

export const getKpiIconName = (type) => {
  let icon = '';
  if (type === 'Firewall') {
    icon = `brick`;
  } else if (type === 'Switch') {
    icon = `network`;
  } else if (type === 'Wireless') {
    icon = `wifi`;
  }
  return icon;
  // <Icon className={"text-primary"} name={""} />;
};

const TabPaneTableBodyRows = ({ data, passingScore }) => {
  return (
    <>
      {data.map((each, idx) => {
        if (idx < 5) {
          return (
            <div className="nk-tb-item" key={idx}>
              <div className="nk-tb-col">
                <div className="icon-text">
                  <Icon className={'text-primary'} name={getKpiIconName(each.type)} />
                  &nbsp;&nbsp;
                  <span className="tb-lead kpi-question" data-kpi={each.tag} style={{ cursor: 'pointer' }}>
                    {' '}
                    {each.question}{' '}
                  </span>
                </div>
              </div>
              <div className="nk-tb-col text-right">
                <span className="tb-sub">
                  {/* <OverlayTrigger
                      key={'left'}
                      placement={'right'}
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip arrow={true}>
                          <ul style={{ listStyle: 'none' }}>
                            <li>Passing Score: {passingScore}</li>
                            <li>
                              Avg Score: {each.score} - Passing: {each.passing}% - Failing: {each.failing}%
                            </li>
                          </ul>
                        </Tooltip>
                      }
                    >
                    </OverlayTrigger> */}
                  {each.score}
                </span>
              </div>
              <div className="nk-tb-col" style={{ minWidth: '7rem' }}>
                <div className="progress progress-md progress-alt bg-transparent">
                  <div className="progress-bar bg-success" data-progress={each.passing} style={{ width: `${each.passing}%` }}></div>
                  <div className="progress-amount">{each.passing}%</div>
                </div>
                {/* <Progress
                    bar
                    className="progress-md progress-alt bg-transparent"
                    value={each.passing}
                    color={each.passing < passingScore ? 'danger' : 'success'}
                    >
                    {each.passing}%
                  </Progress> */}
              </div>
              <div className="nk-tb-col tb-col-sm text-right">
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="right"
                  overlay={
                    <Popover arrow={'true'}>
                      <Popover.Header as="h3">{each.tag}</Popover.Header>
                      <Popover.Body>{each.description}</Popover.Body>
                    </Popover>
                  }
                >
                  <span className="badge badge-dim badge-pill badge-outline-secundary" style={{ cursor: 'pointer' }}>
                    {each.impact_weight}
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          );
        }
        return <span key={idx}></span>;
      })}
    </>
  );
};

export const KPIsModal = ({ modalId, isOpen, toggleModal, modalTitle, published, data }) => {
  return (
    <ResultsModal
      className={'modal-grafana-iframe'}
      style={{ maxWidth: '1120px' }}
      modalId={modalId}
      isOpen={isOpen}
      toggleModal={toggleModal}
      modalTitle={modalTitle}
      modalSubtitle={`Published: ${published}`}
      bodyComponent={<KPIsModalBody data={data} />}
    />
  );
};

const ModalColHead = ({ title }) => {
  return (
    <div class="pricing-head">
      <div class="pricing-title">
        <h4 class="card-title title">{title}</h4>
      </div>
    </div>
  );
};

export const KPIsModalBody = ({ data }) => {
  return (
    <div class="nk-block">
      <div class="row g-2">
        <div class="col-md-12 col-xl-6 col-xxl-3">
          <div class="card pricing card-bordered">
            <ModalColHead title={'Overall'} />
            <KPIsWidgetBody
              type={'Overall'}
              top5Data={data.overall_top_kpis}
              middle5Data={data.overall_middle_range_kpis}
              bottom5Data={data.overall_bottom_kpis}
              passingScore={data.passing_score}
            />
          </div>
        </div>
        <div class="col-md-12 col-xl-6 col-xxl-3">
          <div class="card pricing card-bordered">
            <ModalColHead title={'Firewall'} />
            <KPIsWidgetBody
              type={'Firewall'}
              top5Data={data.firewall_top_kpis}
              middle5Data={data.firewall_middle_range_kpis}
              bottom5Data={data.firewall_bottom_kpis}
              passingScore={data.passing_score}
            />
          </div>
        </div>
        <div class="col-md-12 col-xl-6 col-xxl-3">
          <div class="card pricing card-bordered">
            <ModalColHead title={'Switch'} />
            <KPIsWidgetBody
              type={'Switch'}
              top5Data={data.switch_top_kpis}
              middle5Data={data.switch_middle_range_kpis}
              bottom5Data={data.switch_bottom_kpis}
              passingScore={data.passing_score}
            />
          </div>
        </div>
        <div class="col-md-12 col-xl-6 col-xxl-3">
          <div class="card pricing card-bordered">
            <ModalColHead title={'Wireless'} />
            <KPIsWidgetBody
              type={'Wireless'}
              top5Data={data.wireless_top_kpis}
              middle5Data={data.wireless_middle_range_kpis}
              bottom5Data={data.wireless_bottom_kpis}
              passingScore={data.passing_score}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
