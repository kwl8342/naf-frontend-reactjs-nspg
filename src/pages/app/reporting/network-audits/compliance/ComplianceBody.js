import { useCallback, useState, useEffect } from 'react';
import config from '../../../../../config';
import { secureAxios } from '../../../../../utils/nspgApi';
import CardLoadingBlock from '../../../../components/mondelez/utils/CardLoadingBlock';
import { Block, Row } from '../../../../../components/Component';
import CardServerErrorBlock from '../../../../components/mondelez/utils/CardErrorBlock';
import RegionalWidgets, { manageRegionCards } from './RegionalWidgets';
import { ChartCardWithRangeOpts, getKpiResultsChartDataByRegion } from '../../../../components/mondelez/chart/ChartCardWithRangeOpts';
import { getFilterData } from '../../../../components/mondelez/CommonDataTableFilters';
import moment from 'moment';
import Top10Bottom10List from './Top10Bottom10List';
import GlobalOverviewMap from './GlobalOverviewMap';
import ComplianceWidget from './ComplianceWidget';
import KPIsWidget from './KPIsWidget';
import CardBlock from '../../../../components/mondelez/utils/CardBlock';
import { ReactCommonFilterDropDown } from '../../../../components/mondelez/CommonFilterDropDown';
import { ResultsScoresTable } from '../results/scores/Scores';

let controller;

const ComplianceBody = ({
  selectedReport,
  startDate,
  endDate,
  selectedFrequency,
  setSelectedReport,
  setSelectedReportPublished,
  setPreviousReportSelectorData,
  globalData,
  setGlobalData,
  regionalData,
  setRegionalData,
  setSiteType,
  setIsTop10ModalOpen,
  setIsBottom10ModalOpen,
  setIsComplianceDetailsModalOpen,
  toggleRegionalResultsModal,
  toggleGlobalOverviewModal,
  toggleKpisModal
}) => {
  const [errored, setErrored] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [kpiDropdownData, setKpiDropdownData] = useState([]);

  const loadData = useCallback(async () => {
    if (controller) {
      controller.abort();
      setDataFetched(false);
      setErrored(false);
      console.log('❌ Aborted the previous request!');
    }
    controller = new AbortController();

    secureAxios(
      {
        method: 'GET',
        url: `${config.services.arms.uri}/core/compliance/?format=json&report=${selectedReport}`,
        signal: controller.signal
      },
      'ARMS'
    )
      .then((res) => {
        if (res) {
          setGlobalData(res.data.global_results[0]);
          setRegionalData(res.data.regional_results);
          if (!selectedReport) {
            setSelectedReport(res.data.global_results[0].report);
          }
          setSelectedReportPublished(res.data.global_results[0].published);
          // dispatch(setReportId(res.data.global_results[0].report))

          const temp = [];
          res.data.previous_reports.forEach((e) => {
            temp.push({
              value: e.id,
              label: e.published
            });
          });

          setPreviousReportSelectorData(temp);

          setDataFetched(true);

          manageRegionCards();
          window.addEventListener('resize', () => {
            manageRegionCards();
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrored(true);
      });
  }, [setGlobalData, setPreviousReportSelectorData, setSelectedReport, setRegionalData, setSelectedReportPublished, selectedReport]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setDataFetched(false);
    setErrored(false);
  }, [selectedReport]);

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
    <>
      {dataFetched && globalData ? (
        <Block>
          <Row className="g-2 compliance-dashborad-row1">
            {regionalData.map((regionData, idx) => {
              return (
                <div className="col-sm-12 col-lg-6 regionalscore" key={idx}>
                  <RegionalWidgets data={regionData} />
                </div>
              );
            })}
          </Row>
          <Row className="g-2 compliance-dashborad-row2">
            <div className="col-md-12 col-lg-6">
              {selectedReport ? (
                <ChartCardWithRangeOpts
                  url={`${config.services.arms.uri}/core/compliance/results?format=json&report=${selectedReport}${
                    startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
                  }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
                  // kpi={selectedKpiType}
                  options={{
                    title: 'Regional Results ',
                    subTitle: 'Trending line reflects the average score by region.',
                    maxHeight: '320px',
                    reloadBtn: false,
                    hideOptBtns: true,
                    // btnExtension: data.kpi,
                    showOptDropdown: {
                      display: false
                    },
                    showViewAllBtn: {
                      display: true,
                      openModalFunction: toggleRegionalResultsModal
                    }
                  }}
                  selectedFrequency={selectedFrequency}
                  // region={data.region}
                  // ipam={data.ipam_code}
                />
              ) : (
                ''
              )}
            </div>
            <div className="col-md-12 col-lg-6">
              {kpiDropdownData.length > 0 && selectedReport ? (
                <ChartCardWithRangeOpts
                  url={`${config.services.arms.uri}/results/sites/trending?format=json&report=${selectedReport}${
                    startDate ? `&from=${moment(startDate).format('YYYY-MM-DD')}` : ''
                  }${endDate ? `&to=${moment(endDate).format('YYYY-MM-DD')}` : ''}`}
                  // kpi={selectedKpiType}
                  options={{
                    title: 'KPI Results ',
                    subTitle: 'Trending line reflects the average score by KPI.',
                    maxHeight: '320px',
                    reloadBtn: false,
                    hideOptBtns: true,
                    // btnExtension: data.kpi,
                    showOptDropdown: {
                      display: true,
                      optionsData: kpiDropdownData
                    }
                  }}
                  getChartDataFunc={getKpiResultsChartDataByRegion}
                  selectedFrequency={selectedFrequency}
                  // region={data.region}
                  // ipam={data.ipam_code}
                />
              ) : (
                ''
              )}
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row3">
            <div className="col-sm-6 col-xxl-3">
              <Top10Bottom10List
                sitesData={globalData.overall_top}
                others={{
                  label: 'Top 10',
                  passing_score: globalData.passing_score,
                  published: globalData.published,
                  disableRowOptions: true
                }}
                openModalFunction={() => setIsTop10ModalOpen(true)}
                selectedReport={selectedReport}
              />
            </div>
            <div className="col-sm-6 col-xxl-3">
              <Top10Bottom10List
                sitesData={globalData.overall_bottom}
                others={{
                  label: 'Bottom 10',
                  passing_score: globalData.passing_score,
                  published: globalData.published,
                  disableRowOptions: true
                }}
                openModalFunction={() => setIsBottom10ModalOpen(true)}
                selectedReport={selectedReport}
              />
            </div>
            <div className="col-xxl-6">
              <GlobalOverviewMap regionalData={regionalData} toggleGlobalOverviewModal={toggleGlobalOverviewModal} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row4">
            <div className="col-md-6 col-xxl-2">
              <ComplianceWidget
                data={globalData.overall_compliance}
                passingScore={globalData.passing_score}
                setIsComplianceDetailsModalOpen={setIsComplianceDetailsModalOpen}
              />
            </div>
            <div className="col-md-6 col-xxl-4">
              <KPIsWidget
                top5Data={globalData.overall_top_kpis}
                middle5Data={globalData.overall_middle_range_kpis}
                bottom5Data={globalData.overall_bottom_kpis}
                passingScore={globalData.passing_score}
                toggleKpisModal={toggleKpisModal}
              />
            </div>
            <div className="col-md-12 col-xxl-6">
              <CardBlock
                title={'Site Scores'}
                cardTools={
                  <ul className="btn-toolbar">
                    <li>
                      <ReactCommonFilterDropDown
                      // filterBodyId={`modalAdvanceFilterBody-scores`}
                      // filterFooterId={`modalAdvanceFilterFooter-scores`}
                      />
                    </li>
                  </ul>
                }
                cardBody={
                  <ResultsScoresTable
                    url={`${config.services.arms.uri}/results/scores/compliance/?format=datatables&report=${selectedReport}`}
                    isModal={false}
                    isCompliance={true}
                    setSiteType={setSiteType}
                    options={
                      {
                        // filterBodyId: `modalAdvanceFilterBody-scores`,
                        // filterFooterId: `modalAdvanceFilterFooter-scores`,
                      }
                    }
                  />
                }
                options={{
                  addCardBorder: true
                }}
              />
              {/* <ResultsSitesTable
                  url={`${config.services.arms.uri}/results/sites/history/?format=datatables&report=${data.report}&ipam=${data.ipam_code}${siteType ? `&type=${siteType}` : ''
                    }`}
                  isModal={false}
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
                /> */}
            </div>
          </Row>
        </Block>
      ) : errored ? (
        <Block>
          <Row className="g-2 compliance-dashborad-row1">
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'200px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row2">
            <div className="col-md-12 col-lg-6">
              <CardServerErrorBlock minHeight={'400px'} />
            </div>
            <div className="col-md-12 col-lg-6">
              <CardServerErrorBlock minHeight={'400px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row3">
            <div className="col-sm-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
            <div className="col-sm-6 col-xxl-3">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
            <div className="col-xxl-6">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row4">
            <div className="col-md-6 col-xxl-2">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
            <div className="col-md-6 col-xxl-4">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
            <div className="col-md-12 col-xxl-6">
              <CardServerErrorBlock minHeight={'550px'} />
            </div>
          </Row>
        </Block>
      ) : (
        <Block>
          <Row className="g-2 compliance-dashborad-row1">
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardLoadingBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardLoadingBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardLoadingBlock minHeight={'200px'} />
            </div>
            <div className="col-sm-12 col-md-6 col-xxl-3">
              <CardLoadingBlock minHeight={'200px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row2">
            <div className="col-md-12 col-lg-6">
              <CardLoadingBlock minHeight={'400px'} />
            </div>
            <div className="col-md-12 col-lg-6">
              <CardLoadingBlock minHeight={'400px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row3">
            <div className="col-sm-6 col-xxl-3">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
            <div className="col-sm-6 col-xxl-3">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
            <div className="col-xxl-6">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
          </Row>
          <Row className="g-2 compliance-dashborad-row4">
            <div className="col-md-6 col-xxl-2">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
            <div className="col-md-6 col-xxl-4">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
            <div className="col-md-12 col-xxl-6">
              <CardLoadingBlock minHeight={'550px'} />
            </div>
          </Row>
        </Block>
      )}
    </>
  );
};

export default ComplianceBody;
