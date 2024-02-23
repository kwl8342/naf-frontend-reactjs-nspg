import React from 'react';
import config from '../../../../../config';
import { ChartCardWithRangeOpts } from '../../../../components/mondelez/chart/ChartCardWithRangeOpts';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
import moment from 'moment';

const RegionalResultsModal = ({ modalId, isOpen, toggleModal, modalTitle, published, selectedReport, startDate, endDate, selectedFrequency }) => {
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
          <RegionalResultsModalBody selectedReport={selectedReport} startDate={startDate} endDate={endDate} selectedFrequency={selectedFrequency} />
        </>
      }
    />
  );
};

export default RegionalResultsModal;

const RegionalResultsModalBody = ({ selectedReport, startDate, endDate, selectedFrequency }) => {
  return (
    <div className="nk-block">
      <div className="row g-2">
        <div className="col-xl-6 col-md-12">
          <ChartCardWithRangeOpts
            url={`${config.services.arms.uri}/core/compliance/results?format=json&report=${selectedReport}${
              startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
            }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
            // kpi={selectedKpiType}
            options={{
              title: 'Overall Results ',
              subTitle: 'Trending line reflects the average score.',
              maxHeight: '335px',
              // style: {
              //     height: '37vh',
              //     maxHeight: '400px',
              //     minHeight: '180px'
              // },
              reloadBtn: true,
              hideOptBtns: false,
              // btnExtension: data.kpi,
              showOptDropdown: {
                display: false
              },
              showViewAllBtn: {
                display: false,
                openModalFunction: null
              }
            }}
            selectedFrequency={selectedFrequency}
            // region={data.region}
            // ipam={data.ipam_code}
          />
        </div>
        <div className="col-xl-6 col-md-12">
          <ChartCardWithRangeOpts
            url={`${config.services.arms.uri}/core/compliance/results?format=json&report=${selectedReport}&type=firewall${
              startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
            }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
            // kpi={selectedKpiType}
            options={{
              title: 'Firewall Results ',
              subTitle: 'Trending line reflects the average score.',
              maxHeight: '335px',
              // style: {
              //     height: '37vh',
              //     maxHeight: '400px',
              //     minHeight: '180px'
              // },
              reloadBtn: true,
              hideOptBtns: false,
              // btnExtension: data.kpi,
              showOptDropdown: {
                display: false
              },
              showViewAllBtn: {
                display: false,
                openModalFunction: null
              }
            }}
            selectedFrequency={selectedFrequency}
            // region={data.region}
            // ipam={data.ipam_code}
          />
        </div>
        <div className="col-xl-6 col-md-12">
          <ChartCardWithRangeOpts
            url={`${config.services.arms.uri}/core/compliance/results?format=json&report=${selectedReport}&type=switch${
              startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
            }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
            // kpi={selectedKpiType}
            options={{
              title: 'Switch Results ',
              subTitle: 'Trending line reflects the average score.',
              maxHeight: '335px',
              // style: {
              //     height: '37vh',
              //     maxHeight: '400px',
              //     minHeight: '180px'
              // },
              reloadBtn: true,
              hideOptBtns: false,
              // btnExtension: data.kpi,
              showOptDropdown: {
                display: false
              },
              showViewAllBtn: {
                display: false,
                openModalFunction: null
              }
            }}
            selectedFrequency={selectedFrequency}
            // region={data.region}
            // ipam={data.ipam_code}
          />
        </div>
        <div className="col-xl-6 col-md-12">
          <ChartCardWithRangeOpts
            url={`${config.services.arms.uri}/core/compliance/results?format=json&report=${selectedReport}&type=wireless${
              startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
            }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
            // kpi={selectedKpiType}
            options={{
              title: 'Wireless Results ',
              subTitle: 'Trending line reflects the average score.',
              maxHeight: '335px',
              // style: {
              //     height: '37vh',
              //     maxHeight: '400px',
              //     minHeight: '180px'
              // },
              reloadBtn: true,
              hideOptBtns: false,
              // btnExtension: data.kpi,
              showOptDropdown: {
                display: false
              },
              showViewAllBtn: {
                display: false,
                openModalFunction: null
              }
            }}
            selectedFrequency={selectedFrequency}
            // region={data.region}
            // ipam={data.ipam_code}
          />
        </div>
      </div>
    </div>
  );
};
