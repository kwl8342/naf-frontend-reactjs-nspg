import React, { useCallback, useEffect, useRef, useState } from 'react';

import Content from '../../../../../layout/content/Content';
import Head from '../../../../../layout/head/Head';
import CommonTableBlock from '../../../../components/mondelez/CommonTableBlock';
import DatatablePageHead from '../../../../components/mondelez/DatatablePageHead';
import { Block } from '../../../../../components/Component';

import { DataTableInitialize } from '../../../../components/mondelez/utils/DataTableInitialize';
import { DataTableDestroy } from '../../../../components/mondelez/utils/DataTableDestroy.js';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { toggleResultKpisModal, showResultKpisModal } from '../../../../../features/kpis/resultsKpisModal';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
import config from '../../../../../config';
import { getMsToken } from '../../../../../utils/nspgApi';
import { datatableFilter } from '../../../../components/mondelez/CommonDataTableFilters';
import { checkNull } from '../../../../components/mondelez/utils/datatables';
import $ from 'jquery';
$.DataTable = require('datatables.net');
$.tooltip = require('../../../../../../node_modules/bootstrap/js/src/tooltip');
$.modal = require('../../../../../../node_modules/bootstrap/js/src/modal');

const KPIsTableHead = () => {
  return (
    <thead>
      <tr>
        <th className="nk-tb-col">
          <span className="sub-text">Tag</span>
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
          <span className="sub-text">Type</span>
        </th>
        <th className="nk-tb-col">
          <span className="sub-text" style={{ whiteSpace: 'nowrap' }}>
            Impact Weight
          </span>
        </th>
      </tr>
    </thead>
  );
};

const KpisModalBodyHtml = ({
  data = {
    type: String,
    impact_weight: String,
    question: String,
    description: String,
    testing_criteria: String,
    recommendations: String
  }
}) => {
  return (
    <>
      <dl className="row">
        <dt className="col-sm-2">Type</dt>
        <dd className="col-sm-4">{checkNull(data.type)}</dd>
        {data.impact_weight === '' || data.impact_weight === null || data.impact_weight === '-' ? (
          ''
        ) : (
          <>
            <dt className="col-sm-3 text-truncate">Impact Weight</dt>
            <dd className="col-sm-3">{checkNull(data.impact_weight)}</dd>
          </>
        )}
      </dl>
      <dl className="row">
        {data.question === '' || data.question === null || data.question === '-' ? (
          ''
        ) : (
          <>
            <dt className="col-sm-12 text-truncate">Question</dt>
            <dd className="col-sm-12">{checkNull(data.question)}</dd>
          </>
        )}
      </dl>
      <dl className="row">
        {data.description === '' || data.description === null || data.description === '-' ? (
          ''
        ) : (
          <>
            <dt className="col-sm-12 text-truncate">Description</dt>
            <dd className="col-sm-12">{checkNull(data.description)}</dd>
          </>
        )}
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
    </>
  );
};

const KPIs = () => {
  const networkAudits_kpis_stateData = useRef(null);
  const tableRef = useRef(null);
  const [modalData, setModalData] = useState({});

  const isOpen = useAppSelector((state) => state.resultKpisModal.show);
  const dispatch = useAppDispatch();

  const toggleModal = () => dispatch(toggleResultKpisModal());

  const showModal = useCallback(() => {
    return dispatch(showResultKpisModal());
  }, [dispatch]);

  const KpisDatatablesOptions = useCallback(
    async (ajaxUrl) => {
      const token = await getMsToken('ARMS');
      return {
        processing: true,
        serverSide: true,
        stateSave: true,
        ajax: {
          url: ajaxUrl,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('X-CSRFToken', config.services.nspg.csrfToken);
          },
          error: function (error) {
            console.log(error);
            $(`#datatable-network-audits-kpis`).parent().parent().parent().html(/* cardServerErrorBlock(500) */);
            $('#cover-spin').css('display', 'none');
          }
        },
        createdRow: function (row, data, rowIndex) {
          // Loading Model Data on Row Click
          // $(row).on('click', function () {
          //   // $('#modalKpiResultsDetails').modal('show');
          // });
          row.querySelector('.tag').addEventListener('click', async () => {
            // e.preventDefault();
            setModalData(data);
            showModal();
            // $('#modalKpiResultsDetails-header').html(`<span style="font-weight: 1.7em;">${data.tag}</span>`);

            // $('#modalKpiResultsDetails-body').html(kpisModalBodyHtml(data));
          });
        },
        responsive: {
          details: true
        },
        columnDefs: [
          {
            targets: [0, 2, 6],
            visible: true
          },
          {
            targets: '_all',
            visible: false
          },
          {
            targets: [0, 1, 4],
            type: 'html'
          },
          {
            targets: [0, 5, 6],
            className: 'text-nowrap'
          },
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 6 }
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
            data: 'tag',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).html(
                `<p class="tag rows-link">${
                  oData.type === 'Infrastructure'
                    ? `${oData.tag}`
                    : `<span data-toggle="tooltip" data-placement="right" data-delay='{"show":"1000", "hide":"0"}' title='${oData.question}'>${oData.tag}</span>`
                }</p>`
              );
            }
          },
          {
            data: 'question',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              if (oData.question === '' || oData.question === null || oData.question === '-') {
                $(nTd).text(`-`);
              } else {
                $(nTd).html(`<p>${oData.question}</p>`);
              }
            }
          },
          {
            data: 'description'
          },
          {
            data: 'testing_criteria'
          },
          {
            data: 'recommendations',
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              if (oData.recommendations === '' || oData.recommendations === null || oData.recommendations === '-') {
                $(nTd).text(`-`);
              } else {
                $(nTd).html(`<p>${oData.recommendations}</p>`);
              }
            }
          },
          {
            data: 'type',
            name: 'type__name'
          },
          {
            data: 'impact_weight',
            name: 'impact_weight__impact'
          }
        ],
        drawCallback: function (settings) {
          $("[data-toggle='tooltip']").tooltip();
        },
        stateLoaded: function (settings, data) {
          networkAudits_kpis_stateData.current = data.columns;
        },
        initComplete: function () {
          var filter_kpis_table = this.api();

          datatableFilter(
            filter_kpis_table,
            {
              kpi_type: {
                display: true,
                displayName: 'KPI Type',
                id: 'kpitypeFilter',
                colIndex: 5
              },
              impact_weight: {
                display: true,
                displayName: 'Impact Weight',
                id: 'impactFilter',
                colIndex: 6
              }
            },
            networkAudits_kpis_stateData.current
          );

          $('#cover-spin').css('display', 'none');
          $('#naf-loading-box').remove();
        }
      };
    },
    [showModal]
  );

  useEffect(() => {
    const loadtable = async () => {
      DataTableInitialize(tableRef.current, await KpisDatatablesOptions(`${config.services.arms.uri}/kpis/?format=datatables`));

      $(tableRef.current)
        .on('processing.dt', function (e, settings, processing) {
          $('#cover-spin').css('display', processing ? 'block' : 'none');
        })
        .dataTable();
    };
    loadtable();
  }, [KpisDatatablesOptions]);

  useEffect(() => {
    const r = tableRef.current;
    return () => {
      DataTableDestroy(r);
    };
  }, []);

  return (
    <React.Fragment>
      <Head title="KPIs"></Head>
      <Content>
        <DatatablePageHead title={'KPIs'} description={'Key performance indicators list'} />
        <Block>
          <CommonTableBlock ref={tableRef} isModal={false} component={<KPIsTableHead />} />
        </Block>
        {modalData ? (
          <ResultsModal
            modalId={'modalKpiResultsDetails'}
            isOpen={isOpen}
            toggleModal={toggleModal}
            modalTitle={modalData.tag}
            bodyComponent={<KpisModalBodyHtml data={modalData} />}
          />
        ) : (
          ''
        )}
      </Content>
    </React.Fragment>
  );
};

export default KPIs;
