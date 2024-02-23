import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import config from '../../../../../../config';
import { setResultScoresModalData, showResultScoresModal, toggleResultScoresModal } from '../../../../../../features/scores/resultsScoresModal';
import {
  ChartCardWithRangeOpts,
  getKpiResultsChartDataByRegion,
  getSitesResultsChartDataBySiteType
} from '../../../../../components/mondelez/chart/ChartCardWithRangeOpts';
import { getFilterData } from '../../../../../components/mondelez/CommonDataTableFilters';
import { ReactCommonFilterDropDown } from '../../../../../components/mondelez/CommonFilterDropDown';
import ResultsModal from '../../../../../components/mondelez/ResultsModal';
import CardBlock from '../../../../../components/mondelez/utils/CardBlock';
import { GetScoreIconFill } from '../../../../../components/mondelez/utils/datatables';
import { ResultsDevicesModalBodyHtml, ResultsDevicesTable } from '../devices/Devices';
import { ResultsSitesModalBodyHtml, ResultsSitesTable } from '../sites/Sites';

const ResultsScoresModalBodyHtml = ({
  data,
  siteType,
  setIsDevicesModalOpen,
  setIsSitesModalOpen,
  parentModalId,
  setScoresDrilldownReturnModalId
}) => {
  const [kpiDropdownData, setKpiDropdownData] = useState([]);

  useEffect(() => {
    const loadKpiDropdownData = async () => {
      const temp = [];

      const filterData = await getFilterData(undefined, undefined, true);
      filterData.data.kpi.forEach((each) => {
        temp.push({
          tag: each,
          title: each
        });
      });

      setKpiDropdownData(temp);
    };
    loadKpiDropdownData();
  }, []);

  return (
    <div className="row gx-2">
      <div className="col-12 col-xl-6" id="siteResultsModelChartColDiv">
        <ChartCardWithRangeOpts
          url={`${config.services.arms.uri}/results/scores/compliance/trending?format=json&ipam=${data.ipam_code}`}
          kpi={data.kpi}
          options={{
            title: 'Site Results ',
            subTitle: 'Trending line reflects the overall score by site.',
            maxHeight: '320px',
            reloadBtn: true
          }}
          siteType={siteType}
          getChartDataFunc={getSitesResultsChartDataBySiteType}
        />
      </div>
      <div className="col-12 col-xl-6" id="siteKpiResultsModelChartColDiv">
        {kpiDropdownData.length > 0 ? (
          <ChartCardWithRangeOpts
            url={`${config.services.arms.uri}/results/sites/trending?format=json&ipam=${data.ipam_code}${
              data.report ? `&report=${data.report}` : ''
            }`}
            kpi={data.kpi}
            options={{
              title: 'KPI Results ',
              subTitle: 'Trending line reflects the average score by KPI.',
              maxHeight: '320px',
              reloadBtn: true,
              // btnExtension: data.kpi,
              showOptDropdown: {
                display: true,
                optionsData: kpiDropdownData
              }
            }}
            getChartDataFunc={getKpiResultsChartDataByRegion}
            region={data.region}
            ipam={data.ipam_code}
          />
        ) : (
          ''
        )}
      </div>
      <div className="col-12 col-xl-6 py-4" id="scoresDrildownModelDevicesTableColDiv">
        <CardBlock
          title={'Device Scores'}
          cardTools={
            <ul className="btn-toolbar">
              <li>
                <ReactCommonFilterDropDown
                  filterBodyId={`modalAdvanceFilterBody-devices-${data.ipam_code}`}
                  filterFooterId={`modalAdvanceFilterFooter-devices-${data.ipam_code}`}
                />
              </li>
            </ul>
          }
          cardBody={
            <ResultsDevicesTable
              url={`${config.services.arms.uri}/results/devices/history/?format=datatables&report=${data.report}&ipam=${data.ipam_code}${
                siteType ? `&type=${siteType}` : ''
              }`}
              isModal={true}
              setIsDevicesModalOpen={setIsDevicesModalOpen}
              setIsSitesModalOpen={setIsSitesModalOpen}
              returnModalId={'#modalComplianceDetailsByIpamCode'}
              parentModalId={parentModalId}
              options={{
                filterBodyId: `modalAdvanceFilterBody-devices-${data.ipam_code}`,
                filterFooterId: `modalAdvanceFilterFooter-devices-${data.ipam_code}`,
                filterIdExtension: `-${data.ipam_code}`
              }}
              isDrilldown={false}
            />
          }
          options={{
            addCardBorder: true
          }}
        />
      </div>
      <div className="col-12 col-xl-6 py-4" id="scoresDrildownModelSitesTableColDiv">
        <CardBlock
          title={'Site Scores'}
          cardTools={
            <ul className="btn-toolbar">
              <li>
                <ReactCommonFilterDropDown
                  filterBodyId={`modalAdvanceFilterBody-sites-${data.ipam_code}`}
                  filterFooterId={`modalAdvanceFilterFooter-sites-${data.ipam_code}`}
                />
              </li>
            </ul>
          }
          cardBody={
            <ResultsSitesTable
              url={`${config.services.arms.uri}/results/sites/history/?format=datatables&report=${data.report}&ipam=${data.ipam_code}${
                siteType ? `&type=${siteType}` : ''
              }`}
              isModal={true}
              setIsSitesModalOpen={setIsSitesModalOpen}
              returnModalId={'#modalComplianceDetailsByIpamCode'}
              parentModalId={parentModalId}
              options={{
                filterBodyId: `modalAdvanceFilterBody-sites-${data.ipam_code}`,
                filterFooterId: `modalAdvanceFilterFooter-sites-${data.ipam_code}`,
                filterIdExtension: `-${data.ipam_code}`
              }}
              isDrilldown={false}
              setScoresDrilldownReturnModalId={setScoresDrilldownReturnModalId}
            />
          }
          options={{
            addCardBorder: true
          }}
        />
      </div>
    </div>
  );
};

const ScoresModal = ({ parentModalId, siteType }) => {
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(null);
  const [isSitesModalOpen, setIsSitesModalOpen] = useState(null);
  const [scoresDrilldownReturnModalId, setScoresDrilldownReturnModalId] = useState(null);

  const scoresModalData = useAppSelector((state) => state.resultScoresModal.data);
  const devicesModalData = useAppSelector((state) => state.resultDevicesModal.data);
  const sitesmodalData = useAppSelector((state) => state.resultSitesModal.data);

  const isScoresModalOpen = useAppSelector((state) => state.resultScoresModal.show);

  const dispatch = useAppDispatch();

  const toggleScoresModal = () => {
    if (isScoresModalOpen === false) {
      dispatch(setResultScoresModalData(null));
    }
    dispatch(toggleResultScoresModal());
  };

  const toggleDevicesModal = () => {
    setIsDevicesModalOpen(!isDevicesModalOpen);
  };
  const toggleSitesModal = () => {
    // setScoresDrilldownReturnModalId(null)
    setIsSitesModalOpen(!isSitesModalOpen);
  };

  const showScoresModal = useCallback(() => {
    // setScoresDrilldownReturnModalId(null)
    return dispatch(showResultScoresModal());
  }, [dispatch]);

  useEffect(() => {
    if ((!isDevicesModalOpen || isDevicesModalOpen === false) && scoresDrilldownReturnModalId === 'modalSiteResultsDetails') {
      setIsSitesModalOpen(true);
      setScoresDrilldownReturnModalId(null);
    } else if ((!isDevicesModalOpen || isDevicesModalOpen === false) && isSitesModalOpen === false) {
      showScoresModal();
    }
  }, [isSitesModalOpen, isDevicesModalOpen, showScoresModal, setIsSitesModalOpen, scoresDrilldownReturnModalId]);

  return (
    <>
      {scoresModalData ? (
        <ResultsModal
          className={'modal-grafana-iframe'}
          style={{ maxWidth: '1120px' }}
          modalId={'modalComplianceDetailsByIpamCode'}
          isOpen={isScoresModalOpen}
          toggleModal={toggleScoresModal}
          modalTitle={`Network Audits by Site (${scoresModalData.ipam_code.toUpperCase()})`}
          modalSubtitle={`Published: ${'Date'}`}
          bodyComponent={
            <>
              <ResultsScoresModalBodyHtml
                data={scoresModalData}
                isDevicesModalOpen={isDevicesModalOpen}
                setIsDevicesModalOpen={setIsDevicesModalOpen}
                isSitesModalOpen={isSitesModalOpen}
                setIsSitesModalOpen={setIsSitesModalOpen}
                parentModalId={parentModalId}
                setScoresDrilldownReturnModalId={setScoresDrilldownReturnModalId}
                siteType={siteType}
              />
            </>
          }
        />
      ) : (
        ''
      )}

      {devicesModalData ? (
        <ResultsModal
          modalId={'modalDevicesResultsDetails'}
          isOpen={isDevicesModalOpen}
          toggleModal={toggleDevicesModal}
          modalTitle={
            <>
              <GetScoreIconFill value={devicesModalData.score} applicable={devicesModalData.login} passingScore={devicesModalData.passing_score} />
              <span>{devicesModalData.kpi}</span>
            </>
          }
          bodyComponent={
            <>
              <ResultsDevicesModalBodyHtml data={devicesModalData} />
            </>
          }
        />
      ) : (
        ''
      )}

      {sitesmodalData ? (
        <ResultsModal
          modalId={'modalSiteResultsDetails'}
          isOpen={isSitesModalOpen}
          toggleModal={toggleSitesModal}
          modalTitle={
            <>
              <GetScoreIconFill
                value={sitesmodalData.site_average_score}
                applicable={sitesmodalData.applicable}
                passingScore={sitesmodalData.passing_score}
              />
              <span>{sitesmodalData.kpi}</span>
            </>
          }
          bodyComponent={
            <>
              <ResultsSitesModalBodyHtml
                data={sitesmodalData}
                isDevicesModalOpen={isDevicesModalOpen}
                setIsDevicesModalOpen={setIsDevicesModalOpen}
                setIsSitesModalOpen={setIsSitesModalOpen}
                setScoresDrilldownReturnModalId={setScoresDrilldownReturnModalId}
              />
            </>
          }
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ScoresModal;
