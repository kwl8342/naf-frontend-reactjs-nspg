import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Block, Icon } from '../../../../../../components/Component';
import Content from '../../../../../../layout/content/Content';
import Head from '../../../../../../layout/head/Head';
import CommonTableBlock from '../../../../../components/mondelez/CommonTableBlock';
import DatatablePageHead from '../../../../../components/mondelez/DatatablePageHead';
import { DataTableDestroy } from '../../../../../components/mondelez/utils/DataTableDestroy';
import $ from 'jquery';
import config from '../../../../../../config';
import { DataTableInitialize } from '../../../../../components/mondelez/utils/DataTableInitialize';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { toggleResultSitesModal, showResultSitesModal, setResultSitesModalData } from '../../../../../../features/sites/resultsSitesModal';
import { getMsToken } from '../../../../../../utils/nspgApi';
import { datatableFilter } from '../../../../../components/mondelez/CommonDataTableFilters';
import { capitalizeFirstLetter, checkNull, GetScoreIcon, getScoreIcon, GetScoreIconFill } from '../../../../../components/mondelez/utils/datatables';
import ResultsModal from '../../../../../components/mondelez/ResultsModal';
import { ChartCardWithRangeOpts, getSitesResultsChartData } from '../../../../../components/mondelez/chart/ChartCardWithRangeOpts';
import CardBlock from '../../../../../components/mondelez/utils/CardBlock';
import { ResultsDevicesModalBodyHtml, ResultsDevicesTable } from '../devices/Devices';
import { ReactCommonFilterDropDown } from '../../../../../components/mondelez/CommonFilterDropDown';
import { hideResultScoresModal } from '../../../../../../features/scores/resultsScoresModal';

$.tooltip = require('../../../../../../../node_modules/bootstrap/js/src/tooltip');
$.dropdown = require('../../../../../../../node_modules/bootstrap/js/src/dropdown');

// let networkAudits_resultsSites_selector = '#datatable-network-audits-results-sites';
let networkAudits_resultsSitesHistory_selector = '#datatable-network-audits-results-sites-history';

const ResultsSitesTableHead = () => {
  return (
    <thead>
      <tr>
        <th className="nk-tb-col">
          <span className="sub-text">Report</span>
        </th>
        <th className="nk-tb-col" data-priority="1">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            IPAM Code
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Region</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Sub Region
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Country</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">City</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Site Name
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Site Type
          </span>
        </th>
        <th className="nk-tb-col" data-priority="2">
          <span className="sub-text">KPI</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            KPI Type
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Question</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Description</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Testing Criteria
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Recommendations</span>
        </th>
        <th className="nk-tb-col" data-priority="3">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Impact Weight
          </span>
        </th>
        <th className="nk-tb-col" data-priority="4">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Site Average Score
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Passing Score</span>
        </th>
        <th className="nk-tb-col" data-priority="5">
          <span className="sub-text">Applicable</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Published</span>
        </th>
      </tr>
    </thead>
  );
};

export const ResultsSitesModalBodyHtml = ({
  isDevicesModalOpen,
  setIsDevicesModalOpen,
  setIsSitesModalOpen,
  setScoresDrilldownReturnModalId,
  data = {
    applicable: String,
    report: String,
    ipam_code: String,
    region: String,
    sub_region: String,
    country: String,
    city: String,
    site_average_score: String,
    site_name: String,
    site_type: String,
    device_type: String,
    kpi_type: String,
    impact_weight: String,
    passing_score: String,
    score: String,
    device: String,
    login: String,
    published: String,
    question: String,
    description: String,
    testing_criteria: String,
    recommendations: String
  }
}) => {
  return (
    <>
      <div className="card">
        <dl className="row">
          <dt className="col-sm-2">Report</dt>
          <dd className="col-sm-3">{checkNull(data.report)}</dd>
          <dt className="col-sm-3 text-truncate">Published</dt>
          <dd className="col-sm-4">{data.published}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2 text-truncate">IPAM Code</dt>
          <dd className="col-sm-3">{checkNull(data.ipam_code)}</dd>
          <dt className="col-sm-3 text-truncate">KPI Type</dt>
          <dd className="col-sm-4">{checkNull(data.kpi_type)}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2">Region</dt>
          <dd className="col-sm-3">{checkNull(data.region)}</dd>
          <dt className="col-sm-3 text-truncate">
            <p>Impact Weight</p>
          </dt>
          <dd className="col-sm-4">{checkNull(data.impact_weight)}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2">Country</dt>
          <dd className="col-sm-3">{checkNull(data.country)}</dd>
          <dt className="col-sm-3 text-truncate">Applicable</dt>
          <dd className="col-sm-4">
            <ul className="list-status">
              <li>
                <Icon className={data.applicable ? 'text-warning' : 'text-muted'} name="alert-circle" />
                <span> {capitalizeFirstLetter(data.applicable)}</span>
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2 text-truncate">City</dt>
          <dd className="col-sm-3">{checkNull(data.city)}</dd>

          <dt className="col-sm-3 text-truncate">
            <p>Site Average Score</p>
          </dt>
          <dd className="col-sm-4">
            {data.applicable === false && data.site_average_score === 0 ? (
              '-'
            ) : (
              <ul className="list-status">
                <li>
                  {' '}
                  <GetScoreIcon score={data.site_average_score} passingScore={data.passing_score} />
                  <span style={{ fontWeight: 500 }}>{checkNull(data.site_average_score)}</span>
                </li>
              </ul>
            )}
          </dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2 text-truncate">Site Name</dt>
          <dd className="col-sm-3">{checkNull(data.site_name)}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-2 text-truncate">Site Type</dt>
          <dd className="col-sm-3">{checkNull(data.site_type)}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-12 text-truncate">Question</dt>
          <dd className="col-sm-12">{checkNull(data.question)}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-12 text-truncate">Description</dt>
          <dd className="col-sm-12">{checkNull(data.description)}</dd>
        </dl>
        <dl className="row">
          {data.testing_criteria === '' || data.testing_criteria === null || data.testing_criteria === '-' ? (
            ''
          ) : (
            <>
              <dt className="col-sm-12 text-truncate">Testing Criteria</dt>
              <dd className="col-sm-12">
                <pre className="prettyprint" id="alertCode3" style={{ whiteSpace: 'normal' }}>
                  {data.testing_criteria}
                </pre>
              </dd>
            </>
          )}
        </dl>
        <dl className="row">
          {data.recommendations === '' || data.recommendations === null || data.recommendations === '-' ? (
            ''
          ) : (
            <>
              <dt className="col-sm-12 text-truncate">Recommendations</dt>
              <dd className="col-sm-12">
                <pre className="prettyprint" id="alertCode3" style={{ whiteSpace: 'normal' }}>
                  {data.recommendations}
                </pre>
              </dd>
            </>
          )}
        </dl>
      </div>
      <div className="col-12 px-0" id="siteDrildownModelKpiChartColDiv">
        <ChartCardWithRangeOpts
          url={`${config.services.arms.uri}/results/sites/trending?format=json&ipam=${data.ipam_code}${
            data.report !== '' ? `&report=${data.report}` : ''
          }&kpi=${data.kpi}`}
          kpi={data.kpi}
          options={{
            title: 'KPI Results ',
            subTitle: 'Trending line reflects the average score by KPI.',
            maxHeight: '320px',
            reloadBtn: true,
            // btnExtension: data.kpi,
            showOptDropdown: {
              display: false
            }
          }}
          getChartDataFunc={getSitesResultsChartData}
          region={data.region}
        />
      </div>
      <div className="col-12 px-0 py-4" id="siteDrildownModelDevicesTableColDiv">
        <CardBlock
          title={'Device Scores'}
          cardTools={
            <ul className="btn-toolbar">
              <li>
                <ReactCommonFilterDropDown
                  filterBodyId={`modalAdvanceFilterBody-devices-${data.kpi}`}
                  filterFooterId={`modalAdvanceFilterFooter-devices-${data.kpi}`}
                />
              </li>
            </ul>
          }
          cardBody={
            <ResultsDevicesTable
              url={`${config.services.arms.uri}/results/devices/history/?format=datatables&report=${data.report}&ipam=${data.ipam_code}&kpi=${data.kpi}`}
              isModal={true}
              isDevicesModalOpen={isDevicesModalOpen}
              setIsDevicesModalOpen={setIsDevicesModalOpen}
              setIsSitesModalOpen={setIsSitesModalOpen}
              setScoresDrilldownReturnModalId={setScoresDrilldownReturnModalId}
              returnModalId={'#siteDrildownModelDevicesTableColDiv'}
              parentModalId={null}
              options={{
                filterBodyId: `modalAdvanceFilterBody-devices-${data.kpi}`,
                filterFooterId: `modalAdvanceFilterFooter-devices-${data.kpi}`,
                filterIdExtension: `-${data.kpi}`
              }}
              isDrilldown={true}
            />
          }
          options={{
            addCardBorder: true
          }}
        />
      </div>
    </>
  );
};

export const ResultsSitesTable = ({ url, isModal, setIsSitesModalOpen, returnModalId, parentModalId, options, setScoresDrilldownReturnModalId }) => {
  const networkAudits_resultsSites_stateData = useRef(null);
  const reqUrl = useRef(url);
  const tableRef = useRef(null);
  const [hideTable, setHideTable] = useState(false);
  const [isDataTableloaded, setIsDataTableloaded] = useState(false);

  const dispatch = useAppDispatch();

  const showModal = useCallback(() => {
    return dispatch(showResultSitesModal());
  }, [dispatch]);

  const hideScoresModal = useCallback(() => {
    return dispatch(hideResultScoresModal());
  }, [dispatch]);

  const setModalData = useCallback(
    (data) => {
      return dispatch(setResultSitesModalData(data));
    },
    [dispatch]
  );

  const ResultsSitesDatatablesOptions = useCallback(
    async (
      ajaxUrl,
      isModal,
      returnModalId,
      parentModalId,
      options = {
        filterBodyId: String,
        filterFooterId: String,
        filterIdExtension: String
      }
    ) => {
      const token = await getMsToken('ARMS');
      return {
        processing: true,
        serverSide: true,
        stateSave: isModal === true ? false : true,
        ajax: {
          url: ajaxUrl,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('X-CSRFToken', config.services.nspg.csrfToken);
          },
          error: function (error) {
            console.log(error);
            $(`#datatable-network-audits-results-scores`).parent().parent().parent().html(/* cardServerErrorBlock(500) */);
            $('#cover-spin').css('display', 'none');
          }
        },
        createdRow: function (row, data, rowIndex) {
          // Loading Model Data on Row Click
          row.querySelector('.kpi').addEventListener('click', async () => {
            // $('#modalSiteResultsDetails-header').html(resultsSitesModalHeaderHtml(data));
            // $('#modalSiteResultsDetails-header').attr('data-report', data.report);
            // $('#modalSiteResultsDetails-header').attr('data-region', data.region);
            // $('#modalSiteResultsDetails-header').attr('data-ipam', data.ipam_code);

            // $('#modalSiteResultsDetails-body').html(await resultsSitesModalBodyHtml(data));

            // DataTableInitialize(
            //   `#site-drildown-modal-devices-datatable-${data.kpi}`,
            //   await ResultsDevicesDatatablesOptions(
            //     `../../arms/api/results/devices/history/?format=datatables&report=${data.report}&ipam=${data.ipam_code}&kpi=${data.kpi}`,
            //     true,
            //     '#siteDrildownModelDevicesTableColDiv',
            //     parentModalId,
            //     {
            //       filterBodyId: `modalAdvanceFilterBody-devices-${data.kpi}`,
            //       filterFooterId: `modalAdvanceFilterFooter-devices-${data.kpi}`,
            //       filterIdExtension: `-${data.kpi}`
            //     },
            //     true
            //   )
            // );

            // initDrildownModalResultsChart(data.kpi, selectedComplianceFrequencyValue, data.ipam_code);

            if (isModal === true) {
              // $('#modalComplianceDetailsByIpamCode').unbind('hidden.bs.modal');
              // $('#modalComplianceDetailsByIpamCode').unbind('hide.bs.modal');
              // $('#modalSiteResultsDetails').unbind('hidden.bs.modal');
              // $('#modalSiteResultsDetails').unbind('hide.bs.modal');
              // $(returnModalId).modal('hide');

              // $('#modalSiteResultsDetails').on('hidden.bs.modal', function () {
              //   // const report = $('#modalSiteResultsDetails-header').attr('data-report');
              //   const region = $('#modalSiteResultsDetails-header').attr('data-region');
              //   // const ipam = $('#modalSiteResultsDetails-header').attr('data-ipam');

              //   if (returnModalId === '#modalRegionScoresDetails') {
              //     $(returnModalId).modal('show', {
              //       dataset: {
              //         region: region,
              //         target: returnModalId
              //       }
              //     });
              //   } else {
              //     // initComplianceTablesAndCharts(ipam.toUpperCase(), report, parentModalId, undefined, region);
              //   }
              // });

              // let anchor = document.createElement('a');
              // document.body.appendChild(anchor);

              // anchor.setAttribute('data-target', '#modalSiteResultsDetails');
              // anchor.setAttribute('data-toggle', 'modal');
              // anchor.click();
              // anchor.remove();
              setModalData(data);
              setIsSitesModalOpen(true);
              hideScoresModal();
            } else {
              // $('#modalSiteResultsDetails').modal('show');

              // setIsSitesModalOpen(false);
              setModalData(data);
              showModal();
              setScoresDrilldownReturnModalId('modalComplianceDetailsByIpamCode');
            }
          });
        },
        responsive: {
          details: true
        },
        columnDefs: [
          {
            targets: isModal === true ? [8, 9, 14, 15, 17] : [0, 8, 9, 14, 15, 17],
            visible: true
          },
          {
            targets: '_all',
            visible: false
          },
          {
            targets: [1, 8, 15, 17],
            type: 'html'
          },
          {
            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18],
            className: 'text-nowrap'
          },
          {
            searchable: false,
            targets: [16]
          }
        ],
        buttons: [
          {
            extend: 'copy',
            titleAttr: 'copy'
          },
          {
            extend: 'excel',
            titleAttr: 'Download in Excel'
          },
          {
            extend: 'csv',
            titleAttr: 'Download in CSV'
          },
          {
            extend: 'colvis',
            titleAttr: 'Manage Column Views'
          }
        ],
        lengthMenu: [10, 25, 50, 100, 250, 500],
        columns: [
          {
            data: 'report',
            name: 'report__id'
          }, // 0
          {
            data: 'ipam_code',
            name: 'site__ipam_code',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              const title = `<p>${oData.site_type}: ${oData.site_name} (${oData.region} - ${oData.country})</p>`;
              $(nTd).html(`<a data-toggle="tooltip" data-placement="right" data-html="true" title="${title}">${oData.ipam_code}</a>`);
            }
          }, // 1
          {
            data: 'region',
            name: 'site__region'
          }, // 2
          {
            data: 'sub_region',
            name: 'site__sub_region'
          }, // 3
          {
            data: 'country',
            name: 'site__country'
          }, // 4
          {
            data: 'city',
            name: 'site__city'
          }, // 5
          {
            data: 'site_name',
            name: 'site__name'
          }, // 6
          {
            data: 'site_type',
            name: 'site__type'
          }, // 7
          {
            data: 'kpi',
            name: 'kpi__tag',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                `<a class="kpi" style="color: #E99835; cursor: pointer;">
                        <span data-toggle="tooltip" data-placement="right" title="${oData.question}">${oData.kpi}</span>
                        </a>`
              );
            }
          }, // 8
          {
            data: 'kpi_type',
            name: 'kpi__type__name'
          }, // 9
          {
            data: 'question',
            name: 'kpi__question'
          }, // 10
          {
            data: 'description',
            name: 'kpi__description'
          }, // 11
          {
            data: 'testing_criteria',
            name: 'kpi__testing_criteria'
          }, // 12
          {
            data: 'recommendations',
            name: 'kpi__recommendations',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).text(`
                    ${oData.recommendations === '' || oData.recommendations === null || oData.recommendations === '-' ? '-' : oData.recommendations}
                `);
            }
          }, // 13
          {
            data: 'impact_weight',
            name: 'impact_weight__impact'
          }, // 14
          {
            data: 'site_average_score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              if (oData.applicable === true) {
                $(nTd).html(
                  `<ul class="list-status"><span data-toggle="tooltip" data-placement="right data-html="true" title="<ul style='list-style: none; text-align: left;'><li>Passing Score: ${
                    oData.passing_score
                  }</li><li>Published: ${oData.published}</li></ul>">
                                <li>${getScoreIcon(oData.site_average_score, oData.passing_score)}${oData.site_average_score}</li>
                            </ul>`
                );
              } else if (oData.applicable === false && oData.site_average_score === 0) {
                $(nTd).html('-');
              }
            }
          }, // 15
          {
            data: 'passing_score',
            searchable: false,
            sortable: false
          }, // 16
          {
            data: 'applicable',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                `<ul class="list-status"><li><em class='icon ${
                  oData.applicable ? 'text-warning' : 'text-muted'
                } ni ni-alert-circle'></em><span>${capitalizeFirstLetter(oData.applicable)}</span></li></ul>`
              );
            }
          }, // 17
          {
            data: 'published'
          } // 18
        ],
        drawCallback: function (settings) {
          $("[data-toggle='tooltip']").tooltip({
            delay: { show: 1000, hide: 0 }
          });
        },
        stateLoaded: function (settings, data) {
          networkAudits_resultsSites_stateData.current = data.columns;
        },
        initComplete: function () {
          var results_sites_table = this.api();

          if (isModal === true) {
            let bodyId = 'modalAdvanceFilterBody-sites';
            let footerId = 'modalAdvanceFilterFooter-sites';

            if (options.filterBodyId !== undefined) {
              bodyId = options.filterBodyId;
            }
            if (options.filterFooterId !== undefined) {
              footerId = options.filterFooterId;
            }

            datatableFilter(
              results_sites_table,
              {
                kpi: {
                  display: true,
                  displayName: 'KPI',
                  id: `kpiFilterSites${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 8,
                  useFullRow: true
                },
                kpi_type: {
                  display: true,
                  displayName: 'KPI Type',
                  id: `kpitypeFilterSites${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 9,
                  useFullRow: true
                },
                impact_weight: {
                  display: true,
                  displayName: 'Impact Weight',
                  id: `impactFilterSites${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 14,
                  useFullRow: false
                },
                applicable: {
                  display: true,
                  displayName: 'Applicable',
                  id: `applicableFilterSites${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 17,
                  useFullRow: false
                }
              },
              networkAudits_resultsSites_stateData.current,
              bodyId,
              footerId,
              {
                select2dropdownParent: returnModalId
              }
            );
          }

          if (isModal !== true) {
            datatableFilter(
              results_sites_table,
              {
                report: {
                  display: document.querySelector(networkAudits_resultsSitesHistory_selector) ? true : false,
                  displayName: 'Report',
                  id: 'reportFilter',
                  colIndex: 0
                },
                ipam_code: {
                  display: true,
                  displayName: 'IPAM Code',
                  id: 'ipamcodeFilter',
                  colIndex: 1
                },
                region: {
                  display: true,
                  displayName: 'Region',
                  id: 'regionFilter',
                  colIndex: 2
                },
                sub_region: {
                  display: true,
                  displayName: 'Sub Region',
                  id: 'subregionFilter',
                  colIndex: 3
                },
                country: {
                  display: true,
                  displayName: 'Country',
                  id: 'countryFilter',
                  colIndex: 4
                },
                city: {
                  display: true,
                  displayName: 'City',
                  id: 'cityFilter',
                  colIndex: 5
                },
                kpi: {
                  display: true,
                  displayName: 'KPI',
                  id: 'kpiFilter',
                  colIndex: 8
                },
                kpi_type: {
                  display: true,
                  displayName: 'KPI Type',
                  id: 'kpitypeFilter',
                  colIndex: 9
                },
                impact_weight: {
                  display: true,
                  displayName: 'Impact Weight',
                  id: 'impactFilter',
                  colIndex: 14
                },
                applicable: {
                  display: true,
                  displayName: 'Applicable',
                  id: 'applicableFilter',
                  colIndex: 17
                }
              },
              networkAudits_resultsSites_stateData.current
            );
          }

          $('#cover-spin').css('display', 'none');
          $('#naf-loading-box').remove();
        }
      };
    },
    [showModal, setModalData, hideScoresModal, setIsSitesModalOpen, setScoresDrilldownReturnModalId]
  );

  useEffect(() => {
    const loadtable = async () => {
      setIsDataTableloaded(true);

      const mainTable = tableRef.current;
      DataTableDestroy(mainTable);
      setHideTable(true);

      if (!reqUrl.current) {
        reqUrl.current = `${config.services.arms.uri}/results/sites/latest/?format=datatables`;

        if (window.location.pathname.includes('history')) {
          reqUrl.current = `${config.services.arms.uri}/results/sites/history/?format=datatables`;
        }
      }

      DataTableInitialize(mainTable, await ResultsSitesDatatablesOptions(reqUrl.current, isModal, returnModalId, parentModalId, options));
      setHideTable(false);
      if (!isModal) {
        $(mainTable)
          .on('processing.dt', function (e, settings, processing) {
            $('#cover-spin').css('display', processing ? 'block' : 'none');
          })
          .dataTable();
      }
    };
    if (isDataTableloaded === false) {
      loadtable();
    }
  }, [ResultsSitesDatatablesOptions, isModal, options, parentModalId, returnModalId, isDataTableloaded]);

  useEffect(() => {
    const mainTable = tableRef.current;
    return () => {
      DataTableDestroy(mainTable);
    };
  }, []);

  return <CommonTableBlock ref={tableRef} isModal={isModal} hideTable={hideTable} component={<ResultsSitesTableHead />} />;
};

const ResultsSites = ({ showHistoryBtn }) => {
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(null);

  const isSitesModalOpen = useAppSelector((state) => state.resultSitesModal.show);
  const sitesmodalData = useAppSelector((state) => state.resultSitesModal.data);
  const devicesModalData = useAppSelector((state) => state.resultDevicesModal.data);

  const dispatch = useAppDispatch();

  const toggleSitesModal = () => {
    if (isSitesModalOpen === false) {
      dispatch(setResultSitesModalData(null));
    }
    dispatch(toggleResultSitesModal());
  };
  const toggleDevicesModal = () => setIsDevicesModalOpen(!isDevicesModalOpen);

  const showSitesModal = useCallback(() => {
    return dispatch(showResultSitesModal());
  }, [dispatch]);

  useEffect(() => {
    if (isDevicesModalOpen === false) {
      showSitesModal();
    }
  }, [isDevicesModalOpen, showSitesModal]);

  return (
    <React.Fragment>
      <Head title="Site Results"></Head>
      <Content>
        <DatatablePageHead
          title={'Site results'}
          description={'KPI average score of devices from the site'}
          historyUrl={'/network-audits/results/sites/history'}
          returnUrl={'/network-audits/results/sites'}
          showHistoryBtn={showHistoryBtn}
        />
        <Block>
          <ResultsSitesTable isModal={false} />
        </Block>
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
                />
              </>
            }
          />
        ) : (
          ''
        )}
        {devicesModalData ? (
          <ResultsModal
            modalId={'modalSiteResultsDetails'}
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
      </Content>
    </React.Fragment>
  );
};

export default ResultsSites;

/* ${await chartCardBlockWithRangeOpts(
      {
        class: `site-drildown-modal-kpi-chart-${data.kpi}`,
        id: `siteDrildownModalKpiChart-${data.kpi}`
      },
      {
        title: 'KPI Results ',
        subTitle: 'Trending line reflects the average score by KPI.',
        maxHeight: '320px',
        reloadBtn: true,
        // btnExtension: data.kpi,
        showOptDropdown: {
          display: false
        }
      }
    )}
 */
/*  ${cardBlock({+
      addCardBorder: true,
      title: 'Device Scores',
      cardTools: `<ul class="btn-toolbar"><li>${datatablesFiltersBlock(
        `modalAdvanceFilterBody-devices-${data.kpi}`,
        `modalAdvanceFilterFooter-devices-${data.kpi}`
      )}</li></ul>`,
      cardBody: await tablesHtmlBlock(`site-drildown-modal-devices-datatable-${data.kpi}`, await DevicesTableHead(), true)
    })} */
