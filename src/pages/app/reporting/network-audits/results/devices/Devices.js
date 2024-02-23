import React, { useEffect, useRef, useState, useCallback } from 'react';
import $ from 'jquery';
import DatatablePageHead from '../../../../../components/mondelez/DatatablePageHead';
import CommonTableBlock from '../../../../../components/mondelez/CommonTableBlock';
import { DataTableDestroy } from '../../../../../components/mondelez/utils/DataTableDestroy';
import { DataTableInitialize } from '../../../../../components/mondelez/utils/DataTableInitialize';
import Content from '../../../../../../layout/content/Content';
import config from '../../../../../../config';
import Head from '../../../../../../layout/head/Head';
import { Block } from '../../../../../../components/Component';
import {
  checkNull,
  capitalizeFirstLetter,
  getScoreIcon,
  getTrueOrFalseIcon,
  GetScoreIconFill,
  GetScoreIcon,
  GetTrueOrFalseIcon
} from '../../../../../components/mondelez/utils/datatables';
import { getMsToken } from '../../../../../../utils/nspgApi';
import { datatableFilter } from '../../../../../components/mondelez/CommonDataTableFilters';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { toggleResultDevicesModal, showResultDevicesModal, setResultDevicesModalData } from '../../../../../../features/devices/resultsDevicesModal';
import ResultsModal from '../../../../../components/mondelez/ResultsModal';
import { hideResultSitesModal } from '../../../../../../features/sites/resultsSitesModal';
import { hideResultScoresModal } from '../../../../../../features/scores/resultsScoresModal';

$.tooltip = require('../../../../../../../node_modules/bootstrap/js/src/tooltip');

const DevicesTableHead = () => {
  return (
    <thead>
      <tr>
        <th className="nk-tb-col" data-priority="1">
          <span className="sub-text">Report</span>
        </th>
        <th className="nk-tb-col" data-priority="2">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            IPAM Code
          </span>
        </th>
        <th className="nk-tb-col" data-priority="3">
          <span className="sub-text">Region</span>
        </th>
        <th className="nk-tb-col" data-priority="4">
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
        <th className="nk-tb-col" data-priority="5">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Device
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Device Type
          </span>
        </th>
        <th className="nk-tb-col" data-priority="6">
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
          <span className="sub-text">Recomendations</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Impact Weight
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Finding</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Resolution</span>
        </th>
        <th className="nk-tb-col" data-priority="7">
          <span className="sub-text">Score</span>
        </th>
        <th className="nk-tb-col" data-priority="8">
          <span className="sub-text">Login</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Passing Score</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Published</span>
        </th>
      </tr>
    </thead>
  );
};

export const ResultsDevicesModalBodyHtml = ({
  data = {
    report: String,
    ipam_code: String,
    region: String,
    sub_region: String,
    country: String,
    city: String,
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
    recommendations: String,
    finding: String,
    resolution: String
  }
}) => {
  return (
    <>
      <dl className="row">
        <dt className="col-sm-2">Report</dt>
        <dd className="col-sm-4">{checkNull(data.report)}</dd>
        <dt className="col-sm-2 text-truncate">Published</dt>
        <dd className="col-sm-4">{data.published}</dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2 text-truncate">IPAM Code</dt>
        <dd className="col-sm-4">{checkNull(data.ipam_code)}</dd>
        <dt className="col-sm-2 text-truncate">Device</dt>
        <dd className="col-sm-4">{checkNull(data.device)}</dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2">Region</dt>
        <dd className="col-sm-4">{checkNull(data.region)}</dd>
        <dt className="col-sm-2 text-truncate">Device Type</dt>
        <dd className="col-sm-4">{checkNull(data.device_type)}</dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2">Country</dt>
        <dd className="col-sm-4">{checkNull(data.country)}</dd>
        <dt className="col-sm-2 text-truncate">KPI Type</dt>
        <dd className="col-sm-4">{checkNull(data.kpi_type)}</dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2 text-truncate">City</dt>
        <dd className="col-sm-4">{checkNull(data.city)}</dd>
        <dt className="col-sm-2 text-truncate">
          <p>Impact Weight</p>
        </dt>
        <dd className="col-sm-4">{checkNull(data.impact_weight)}</dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2 text-truncate">Site Name</dt>
        <dd className="col-sm-4">{checkNull(data.site_name)}</dd>
        <dt className="col-sm-2 text-truncate">Login</dt>
        <dd className="col-sm-4">
          <GetTrueOrFalseIcon value={data.login} />
        </dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-2 text-truncate">Site Type</dt>
        <dd className="col-sm-4">{checkNull(data.site_type)}</dd>
        <dt className="col-sm-2 text-truncate">Score</dt>
        <dd className="col-sm-4">
          <ul className="list-status">
            <li>
              {' '}
              <GetScoreIcon score={data.score} passingScore={data.passing_score} />
              <span style={{ fontWeight: '500' }}>{checkNull(data.score)}</span>
            </li>
          </ul>
        </dd>
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
      <dl className="row">
        {data.finding === '' || data.finding === null || data.finding === '-' ? (
          ''
        ) : (
          <>
            <dt className="col-sm-12 text-truncate">Finding</dt>
            <dd className="col-sm-12">
              <pre className="prettyprint" id="alertCode3" style={{ whiteSpace: 'normal' }}>
                {data.finding}
              </pre>
            </dd>
          </>
        )}
      </dl>
      <dl className="row">
        {data.resolution === '' || data.resolution === null || data.resolution === '-' ? (
          <pre></pre>
        ) : (
          <>
            <dt className="col-sm-12 text-truncate">Resolution</dt>
            <dd className="col-sm-12">
              <pre className="prettyprint" id="alertCode3" style={{ whiteSpace: 'normal' }}>
                {data.resolution}
              </pre>
            </dd>
          </>
        )}
      </dl>
    </>
  );
};

export const ResultsDevicesTable = ({
  url,
  isModal,
  setIsDevicesModalOpen,
  setIsSitesModalOpen,
  setScoresDrilldownReturnModalId,
  returnModalId,
  parentModalId,
  options = {
    filterBodyId: String,
    filterFooterId: String,
    filterIdExtension: String
  },
  isDrilldown
}) => {
  let networkAudits_resultsDevicesHistory_selector = '#datatable-network-audits-results-devices-history';

  const networkAudits_resultsDevices_stateData = useRef(null);
  const tableRef = useRef(null);
  const urlRef = useRef(url);
  const [hideTable, setHideTable] = useState(false);

  const dispatch = useAppDispatch();

  const showDevicesModal = useCallback(() => {
    return dispatch(showResultDevicesModal());
  }, [dispatch]);

  const hideSitesModal = useCallback(() => {
    return dispatch(hideResultSitesModal());
  }, [dispatch]);

  const hideScoresModal = useCallback(() => {
    return dispatch(hideResultScoresModal());
  }, [dispatch]);

  const setModalData = useCallback(
    (data) => {
      return dispatch(setResultDevicesModalData(data));
    },
    [dispatch]
  );

  const ResultsDevicesDatatablesOptions = useCallback(
    async (
      ajaxUrl,
      isModal,
      returnModalId,
      parentModalId,
      options = {
        filterBodyId: String,
        filterFooterId: String,
        filterIdExtension: String
      },
      isDrilldown
    ) => {
      const token = await getMsToken('ARMS');
      return {
        retrieve: true,
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
            $(`#datatable-network-audits-results-devices`).parent().parent().parent().html(/* cardServerErrorBlock(500) */);
            $('#cover-spin').css('display', 'none');
          }
        },
        createdRow: function (row, data, rowIndex) {
          // Loading Model Data on Row Click
          row.querySelectorAll('.kpi').forEach((elem) => {
            elem.addEventListener('click', async () => {
              if (isModal === true && isDrilldown !== true && isDrilldown === false) {
                // $('#modalComplianceDetailsByIpamCode').unbind('hidden.bs.modal');
                // $('#modalComplianceDetailsByIpamCode').unbind('hide.bs.modal');
                // $('#modalDeviceResultsDetails').unbind('hidden.bs.modal');
                // $('#modalDeviceResultsDetails').unbind('hide.bs.modal');
                // $(returnModalId).modal('hide');

                // $('#modalDeviceResultsDetails').on('hidden.bs.modal', function () {
                //   const report = $('#modalDeviceResultsDetails-header').attr('data-report');
                //   const region = $('#modalDeviceResultsDetails-header').attr('data-region');
                //   const ipam = $('#modalDeviceResultsDetails-header').attr('data-ipam');
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

                // anchor.setAttribute('data-target', '#modalDeviceResultsDetails');
                // anchor.setAttribute('data-toggle', 'modal');
                // anchor.click();
                // anchor.remove();
                setModalData(data);
                hideScoresModal();
                setIsDevicesModalOpen(true);
              } else if (isModal === true && isDrilldown === true && isDrilldown !== false) {
                // $('#modalComplianceDetailsByIpamCode').unbind('hidden.bs.modal');
                // $('#modalComplianceDetailsByIpamCode').unbind('hide.bs.modal');
                // $('#modalDeviceResultsDetails').unbind('hidden.bs.modal');
                // $('#modalDeviceResultsDetails').unbind('hide.bs.modal');
                // $('#modalSiteResultsDetails').unbind('hidden.bs.modal');
                // $('#modalSiteResultsDetails').unbind('hide.bs.modal');
                // $('#modalSiteResultsDetails').modal('hide');

                // let anchor = document.createElement('a');
                // document.body.appendChild(anchor);

                // anchor.setAttribute('data-target', '#modalDeviceResultsDetails');
                // anchor.setAttribute('data-toggle', 'modal');
                // anchor.click();
                // anchor.remove();

                setModalData(data);
                hideSitesModal();
                setIsDevicesModalOpen(true);

                // $('#modalDeviceResultsDetails').on('hidden.bs.modal', function () {
                //   // $('#modalSiteResultsDetails').modal('show');
                //   let anchor = document.createElement('a');
                //   document.body.appendChild(anchor);

                //   anchor.setAttribute('data-target', '#modalSiteResultsDetails');
                //   anchor.setAttribute('data-toggle', 'modal');
                //   anchor.click();
                //   anchor.remove();

                //   $('#modalSiteResultsDetails').on('hidden.bs.modal', function () {
                //     const report = $('#modalDeviceResultsDetails-header').attr('data-report');
                //     const region = $('#modalDeviceResultsDetails-header').attr('data-region');
                //     const ipam = $('#modalDeviceResultsDetails-header').attr('data-ipam');
                //     if (returnModalId === '#modalRegionScoresDetails') {
                //       $(returnModalId).modal('show', {
                //         dataset: {
                //           region: region,
                //           target: returnModalId
                //         }
                //       });
                //     } else {
                //       // initComplianceTablesAndCharts(ipam.toUpperCase(), report, parentModalId, undefined, region);
                //     }
                //   });
                // });
              } else {
                // $('#modalDeviceResultsDetails').modal('show');
                setModalData(data);
                showDevicesModal();
              }
              setIsSitesModalOpen(false);
              setScoresDrilldownReturnModalId('modalSiteResultsDetails');
            });
          });
        },
        responsive: {
          details: true
        },
        columnDefs: [
          {
            targets: isModal === true ? [8, 9, 10, 19, 20] : [0, 1, 2, 3, 8, 10, 19, 20],
            visible: true
          },
          {
            targets: '_all',
            visible: false
          },
          {
            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 19, 20, 21, 22],
            className: 'text-nowrap'
          },
          {
            targets: [15],
            className: 'text-wrap'
          },
          {
            targets: [1, 11, 19, 20],
            type: 'html'
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
              const title = `<p>${checkNull(oData.site_type)} : ${oData.site_name} (${oData.region} - ${oData.country}) </p>`;
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
            data: 'device',
            name: 'device__device'
          }, // 8
          {
            data: 'device_type',
            name: 'device__type__name'
          }, // 9
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
          }, // 10
          {
            data: 'kpi_type',
            name: 'kpi__type__name'
          }, // 11
          {
            data: 'question',
            name: 'kpi__question'
          }, // 12
          {
            data: 'description',
            name: 'kpi__description'
          }, // 13
          {
            data: 'testing_criteria',
            name: 'kpi__testing_criteria'
          }, // 14
          {
            data: 'recommendations',
            name: 'kpi__recommendations'
          }, // 15
          {
            data: 'impact_weight',
            name: 'kpi__impact_weight__impact'
          }, // 16
          {
            data: 'finding'
          }, // 17
          {
            data: 'resolution'
          }, // 18
          {
            data: 'score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                `<ul class="list-status"><span data-toggle="tooltip" data-placement="right" data-html="true" title="<ul style='list-style: none; text-align: left;'><li>Passing Score: ${
                  oData.passing_score
                }</li><li>Published: ${oData.published}</li></ul>">
                            <li>${getScoreIcon(oData.score, oData.passing_score)}${oData.score}</li>
                        </ul>`
              );
            }
          }, // 19
          {
            data: 'login',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                `<ul class="list-status"><li>${getTrueOrFalseIcon(oData.login)}<span>${capitalizeFirstLetter(oData.login)}</span></li></ul>`
              );
            }
          }, // 20
          {
            data: 'passing_score',
            searchable: false,
            sortable: false
          }, // 21
          {
            data: 'published'
          } // 22
        ],
        drawCallback: function (settings) {
          $("[data-toggle='tooltip']").tooltip({
            delay: { show: 1000, hide: 0 }
          });
        },
        stateLoaded: function (settings, data) {
          networkAudits_resultsDevices_stateData.current = data.columns;
        },
        initComplete: function () {
          var results_devices_table = this.api();

          if (isModal === true) {
            let bodyId = 'modalAdvanceFilterBody-devices';
            let footerId = 'modalAdvanceFilterFooter-devices';

            if (options.filterBodyId !== undefined) {
              bodyId = options.filterBodyId;
            }
            if (options.filterFooterId !== undefined) {
              footerId = options.filterFooterId;
            }

            datatableFilter(
              results_devices_table,
              {
                kpi: {
                  display: isDrilldown === true ? false : true,
                  displayName: 'KPI',
                  id: `kpiFilterDevices${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 10,
                  useFullRow: true,
                  isModal: isModal
                },
                kpi_type: {
                  display: isDrilldown === true ? false : true,
                  displayName: 'KPI Type',
                  id: `kpitypeFilterDevices${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 11,
                  useFullRow: true
                },
                impact_weight: {
                  display: isDrilldown === true ? false : true,
                  displayName: 'Impact Weight',
                  id: `impactFilterDevices${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 16,
                  useFullRow: false
                },
                device_score: {
                  display: isDrilldown === true ? true : false,
                  displayName: 'Device Score',
                  id: `deviceScoreFilter${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 19
                },
                login: {
                  display: true,
                  displayName: 'Login',
                  id: `loginFilterDevices${options.filterIdExtension !== undefined ? options.filterIdExtension : ''}`,
                  colIndex: 20,
                  useFullRow: false
                }
              },
              networkAudits_resultsDevices_stateData.current,
              bodyId,
              footerId,
              {
                select2dropdownParent: returnModalId
              }
            );
          }

          if (isModal !== true) {
            datatableFilter(
              results_devices_table,
              {
                report: {
                  display: document.querySelector(networkAudits_resultsDevicesHistory_selector) ? true : false,
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
                site_type: {
                  display: true,
                  displayName: 'Site Type',
                  id: 'sitetypeFilter',
                  colIndex: 7
                },
                device_type: {
                  display: true,
                  displayName: 'Device Type',
                  id: 'devicetypeFilter',
                  colIndex: 9
                },
                kpi: {
                  display: true,
                  displayName: 'KPI',
                  id: 'kpiFilter',
                  colIndex: 10
                },
                kpi_type: {
                  display: true,
                  displayName: 'KPI Type',
                  id: 'kpitypeFilter',
                  colIndex: 11
                },
                impact_weight: {
                  display: true,
                  displayName: 'Impact Weight',
                  id: 'impactFilter',
                  colIndex: 16
                },
                device_score: {
                  display: true,
                  displayName: 'Device Score',
                  id: 'deviceScoreFilter',
                  colIndex: 19
                },
                login: {
                  display: true,
                  displayName: 'Login',
                  id: 'loginFilter',
                  colIndex: 20
                }
              },
              networkAudits_resultsDevices_stateData.current
            );
          }

          $('#cover-spin').css('display', 'none');
          $('#naf-loading-box').remove();
        }
      };
    },
    [
      networkAudits_resultsDevicesHistory_selector,
      showDevicesModal,
      hideScoresModal,
      hideSitesModal,
      setIsDevicesModalOpen,
      setIsSitesModalOpen,
      setModalData,
      setScoresDrilldownReturnModalId
    ]
  );

  useEffect(() => {
    const loadtable = async () => {
      const mainTable = tableRef.current;
      DataTableDestroy(mainTable);
      setHideTable(true);

      if (!urlRef.current) {
        urlRef.current = `${config.services.arms.uri}/results/devices/latest/?format=datatables`;

        if (window.location.pathname.includes('history')) {
          urlRef.current = `${config.services.arms.uri}/results/devices/history/?format=datatables`;
        }
      }

      DataTableInitialize(
        mainTable,
        await ResultsDevicesDatatablesOptions(urlRef.current, isModal, returnModalId, parentModalId, options, isDrilldown)
      );
      setHideTable(false);

      if (!isModal) {
        $(mainTable)
          .on('processing.dt', function (e, settings, processing) {
            $('#cover-spin').css('display', processing ? 'block' : 'none');
          })
          .dataTable();
      }
    };
    loadtable();
    // eslint-disable-next-line
  }, [ResultsDevicesDatatablesOptions]);

  useEffect(() => {
    const mainTable = tableRef.current;
    return () => {
      DataTableDestroy(mainTable);
    };
  }, []);

  return <CommonTableBlock ref={tableRef} isModal={isModal} hideTable={hideTable} component={<DevicesTableHead />} />;
};

const ResultsDevices = ({ showHistoryBtn }) => {
  // const [devicesModalData, setDevicesModalData] = useState({});

  const isDevicesModalOpen = useAppSelector((state) => state.resultDevicesModal.show);
  const devicesModalData = useAppSelector((state) => state.resultDevicesModal.data);

  const dispatch = useAppDispatch();

  const toggleDevicesModal = () => {
    if (isDevicesModalOpen === false) {
      dispatch(setResultDevicesModalData(null));
    }
    dispatch(toggleResultDevicesModal());
  };

  return (
    <React.Fragment>
      <Head title="Score Results"></Head>
      <Content>
        <DatatablePageHead
          title={'Device results'}
          description={'Network Audit KPI score by network devices'}
          historyUrl={'/network-audits/results/devices/history'}
          returnUrl={'/network-audits/results/devices'}
          showHistoryBtn={showHistoryBtn}
        />
        <Block>
          <ResultsDevicesTable isModal={false} />
        </Block>
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

export default ResultsDevices;
