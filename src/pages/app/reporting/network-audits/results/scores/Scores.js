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
import { getMsToken } from '../../../../../../utils/nspgApi';
import { checkNull, setScoreColorChange, setScoreColorWithScoreChange } from '../../../../../components/mondelez/utils/datatables';
import { datatableFilter } from '../../../../../components/mondelez/CommonDataTableFilters';
import { useAppDispatch } from '../../../../../../app/hooks';
import { showResultScoresModal, setResultScoresModalData } from '../../../../../../features/scores/resultsScoresModal';
import ScoresModal from './ScoresModal';
$.tooltip = require('../../../../../../../node_modules/bootstrap/js/src/tooltip');

let networkAudits_resultsScoresHistory_selector = '#datatable-network-audits-results-sites-history';

const ScoresTableHead = () => {
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
          <span className="sub-text">Site Name</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Site Type</span>
        </th>
        <th className="nk-tb-col" data-priority="2">
          <span className="sub-text">Score</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Score Change</span>
        </th>
        <th className="nk-tb-col" data-priority="3">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Firewall Score
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Firewall Score Change</span>
        </th>
        <th className="nk-tb-col" data-priority="4">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Switch Score
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Switch Score Change</span>
        </th>
        <th className="nk-tb-col" data-priority="5">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Wireless Score
          </span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text">Wireless Score Change</span>
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

export const ResultsScoresTable = ({ url, isModal, isCompliance, returnModalId, options, setSiteType }) => {
  const networkAudits_resultsScores_stateData = useRef(null);
  const tableRef = useRef(null);
  const modalTabelRef = useRef(null);
  const [hideTable, setHideTable] = useState(false);

  const dispatch = useAppDispatch();

  const showModal = useCallback(() => {
    return dispatch(showResultScoresModal());
  }, [dispatch]);

  const setModalData = useCallback(
    (data) => {
      return dispatch(setResultScoresModalData(data));
    },
    [dispatch]
  );

  const ResultsScoresDatatablesOptions = useCallback(
    async (
      ajaxUrl,
      isModal,
      returnModalId,
      options = {
        filterBodyId: String,
        filterFooterId: String
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
          row.querySelectorAll('.ipam').forEach((elem) => {
            elem.addEventListener('click', async () => {
              const siteType = elem.getAttribute('data-siteType');
              setSiteType(siteType);
              setModalData(data);
              showModal();
            });
          });
        },
        responsive: {
          details: true
        },
        columnDefs: [
          {
            targets: [1, 8, 10, 12, 14],
            visible: true
          },
          {
            targets: '_all',
            visible: false,
            className: 'text-nowrap'
          },
          {
            targets: [9, 11, 13, 15],
            searchable: false
          },
          {
            targets: [9, 11, 13, 15],
            orderable: false
          },
          {
            order: [
              [0, 'dsc'],
              [8, 'dsc']
            ]
          },
          {
            targets: [1, 8, 9, 10, 11, 12, 13, 14, 15],
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
              $(nTd).html(
                `<a class="ipam" style="color: #E99835; cursor: pointer;" data-toggle="tooltip" data-placement="right" data-html="true" title="${title}">${oData.ipam_code}</a>`
              );
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
            data: 'score',
            name: 'score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                setScoreColorWithScoreChange(oData.score, oData.published, oData.score_change, oData.passing_score, oData.report, oData.ipam_code, {
                  additonalClasses: 'ipam',
                  enablePointer: true
                })
              );
            }
          }, // 8
          {
            data: 'score_change',
            searchable: false,
            ordering: false,
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(setScoreColorChange(oData.score_change));
            }
          }, // 9
          {
            data: 'firewall_score',
            name: 'firewall_score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                setScoreColorWithScoreChange(
                  oData.firewall_score,
                  oData.published,
                  oData.firewall_score_change,
                  oData.passing_score,
                  oData.report,
                  oData.ipam_code,
                  {
                    additonalClasses: 'ipam',
                    enablePointer: true,
                    siteTypeAttrValue: 'Firewall'
                  }
                )
              );
            }
          }, // 10
          {
            data: 'firewall_score_change',
            searchable: false,
            ordering: false,
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(setScoreColorChange(oData.firewall_score_change));
            }
          }, // 11
          {
            data: 'switch_score',
            name: 'switch_score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                setScoreColorWithScoreChange(
                  oData.switch_score,
                  oData.published,
                  oData.switch_score_change,
                  oData.passing_score,
                  oData.report,
                  oData.ipam_code,
                  {
                    additonalClasses: 'ipam',
                    enablePointer: true,
                    siteTypeAttrValue: 'Switch'
                  }
                )
              );
            }
          }, // 12
          {
            data: 'switch_score_change',
            searchable: false,
            ordering: false,
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(setScoreColorChange(oData.switch_score_change));
            }
          }, // 13
          {
            data: 'wireless_score',
            name: 'wireless_score',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                setScoreColorWithScoreChange(
                  oData.wireless_score,
                  oData.published,
                  oData.wireless_score_change,
                  oData.passing_score,
                  oData.report,
                  oData.ipam_code,
                  {
                    additonalClasses: 'ipam',
                    enablePointer: true,
                    siteTypeAttrValue: 'Wireless'
                  }
                )
              );
            }
          }, // 14
          {
            data: 'wireless_score_change',
            searchable: false,
            ordering: false,
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(setScoreColorChange(oData.wireless_score_change));
            }
          }, // 15
          {
            data: 'passing_score',
            searchable: false,
            sortable: false
          }, // 16
          {
            data: 'published'
          } // 17
        ],
        drawCallback: function (settings) {
          $("[data-toggle='tooltip']").tooltip({
            delay: { show: 1000, hide: 0 }
          });
        },
        stateLoaded: function (settings, data) {
          networkAudits_resultsScores_stateData.current = data.columns;
        },
        initComplete: function () {
          var filter_results_scores_table = this.api();

          if (isModal !== true) {
            datatableFilter(
              filter_results_scores_table,
              {
                report: {
                  display: document.querySelector(networkAudits_resultsScoresHistory_selector) ? true : false,
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
                site_name: {
                  display: true,
                  displayName: 'Site Name',
                  id: 'siteNameFilter',
                  colIndex: 6
                }
              },
              networkAudits_resultsScores_stateData.current,
              options.filterBodyId ? options.filterBodyId : null,
              options.filterFooterId ? options.filterFooterId : null
            );
          }

          $('#cover-spin').css('display', 'none');
          $('#naf-loading-box').remove();
        }
      };
    },
    // eslint-disable-next-line
    [showModal, setModalData]
  );

  useEffect(() => {
    const loadtable = async () => {
      const mainTable = tableRef.current;
      DataTableDestroy(mainTable);
      setHideTable(true);

      if (!url) {
        // eslint-disable-next-line
        url = `${config.services.arms.uri}/results/scores/latest/?format=datatables`;

        if (window.location.pathname.includes('history')) {
          url = `${config.services.arms.uri}/results/scores/history/?format=datatables`;
        }
      }

      DataTableInitialize(mainTable, await ResultsScoresDatatablesOptions(url, isModal, returnModalId, options));
      setHideTable(false);

      $(mainTable)
        .on('processing.dt', function (e, settings, processing) {
          $('#cover-spin').css('display', processing ? 'block' : 'none');
        })
        .dataTable();
    };
    loadtable();
  }, [ResultsScoresDatatablesOptions]);

  useEffect(() => {
    const mainTable = tableRef.current;
    return () => {
      DataTableDestroy(mainTable);
    };
  }, []);

  useEffect(() => {
    const modalTable = modalTabelRef.current;
    return () => {
      DataTableDestroy(modalTable);
    };
  }, []);

  return <CommonTableBlock ref={tableRef} isModal={isModal} isCompliance={isCompliance} hideTable={hideTable} component={<ScoresTableHead />} />;
};

const ResultsScores = ({ showHistoryBtn }) => {
  const [siteType, setSiteType] = useState(null);

  return (
    <React.Fragment>
      <Head title="Score Results"></Head>
      <Content>
        <DatatablePageHead
          title={'Score Results'}
          description={'Network audit finding score overview by site and type of devices'}
          historyUrl={'/network-audits/results/scores/history'}
          returnUrl={'/network-audits/results/scores'}
          showHistoryBtn={showHistoryBtn}
        />
        <Block>
          <ResultsScoresTable isModal={false} setSiteType={setSiteType} />
        </Block>
        <ScoresModal siteType={siteType} />
      </Content>
    </React.Fragment>
  );
};

export default ResultsScores;
