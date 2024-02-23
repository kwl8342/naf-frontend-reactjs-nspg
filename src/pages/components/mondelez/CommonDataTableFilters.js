import config from "../../../config";
import { secureAxios } from "../../../utils/nspgApi";
import { retriveColumnFilterData } from "./utils/datatables";

const $ = require('jquery');
$.select2 = require('../../../../node_modules/select2/dist/js/select2.min.js')

export const getFilterData = async (microService = 'ARMS', filterDataUrl = '/core/filters/?format=datatables', saveInLocalStorage = 'true') => {
    let msFilterDataVariavle = `armsFilterdata`;
    let url = `${config.services.arms.uri}/core/filters/?format=datatables`
    if (typeof microService === 'string') {
        msFilterDataVariavle = `${microService.toLowerCase()}Filterdata`
    }
    if (typeof filterDataUrl === 'string') {
        url = `${config.services.arms.uri}${filterDataUrl}`
    }
    if (saveInLocalStorage !== false) {
        saveInLocalStorage = true
    }

    if (typeof microService === 'string') {
        if (typeof saveInLocalStorage === 'boolean' && saveInLocalStorage === true && localStorage.getItem(msFilterDataVariavle)) {
            return JSON.parse(localStorage.getItem(msFilterDataVariavle));
        } else {
            const data = (await secureAxios({
                method: 'GET',
                url: url
            }, microService)).data;
            if (saveInLocalStorage === true) {
                localStorage.setItem(msFilterDataVariavle, JSON.stringify(data));
            }
            return data;
        }
    }
};

// filters = {
//         microService: String,
//         msFilterDataUrl: String,
//         saveInLocalStorage: Boolean,
//         report: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         ipam_code: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         region: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         sub_region: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         country: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         city: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         site_name: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         site_type: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         device_type: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         kpi: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         kpi_type: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         impact_weight: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             i: String,
//             colIndex: Number,
//         },
//         site_score: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         device_score: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         login: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         applicable: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         ssid: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         classification: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         status: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
//         published: {
//             useFullRow: Boolean,
//             display: Boolean,
//             displayName: String,
//             id: String,
//             colIndex: Number,
//         },
// },

export const datatableFilter = async (
    table,
    filters,
    stateData,
    filterContainerId,
    filterContainerFooterId,
    options = {}
) => {
    const container = filterContainerId ? `#${filterContainerId}` : '#advanceFilterBody';
    const containerFooter = filterContainerFooterId ? `#${filterContainerFooterId}` : '#advanceFilterFooter';

    if ($(container)) {
        $(container).empty();
    }
    if ($(containerFooter)) {
        $(containerFooter).empty();
    }

    let datatableFilterData;
    if (
        typeof filters.microService === 'string' &&
        typeof filters.msFilterDataUrl === 'string' &&
        typeof filters.saveInLocalStorage === 'boolean'
    ) {
        datatableFilterData = await getFilterData(filters.microService, filters.msFilterDataUrl, filters.saveInLocalStorage);
    } else {
        datatableFilterData = await getFilterData();
    }

    var datatable = table;

    const containerRow = $(`<div class="row gx-6 gy-4"></div>`).appendTo($(container));

    const filterElementHtml = (name, id, useCol12) => {
        return `
            <div class="${useCol12 ? 'col-12' : 'col-6'} pb-2">
                <div class="form-group">
                    <label class="overline-title overline-title-alt">${name}</label>
                    <div id="${id}" class="form-control-wrap"></div>
                </div>
            </div>
        `;
    };

    const selectTag = '<select class="form-select w-100" data-search="on"><option value="">All</option></select>';

    // report filter
    var filter_report_select;
    if (filters.report && filters.report.display === true) {
        $(filterElementHtml(filters.report.displayName, filters.report.id, filters.report.useFullRow)).appendTo(containerRow);
        filter_report_select = $(selectTag)
            .appendTo($(`#${filters.report.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_report_select.val());
                datatable
                    .column(filters.report.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.report.length; i++) {
            filter_report_select.append(`<option value="${datatableFilterData.data.report[i]}">${datatableFilterData.data.report[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.report.colIndex].search.search !== '') {
                $(`#${filters.report.id} option[value="${retriveColumnFilterData(stateData[filters.report.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // ipam_code filter
    var filter_ipam_code_select;
    if (filters.ipam_code && filters.ipam_code.display === true) {
        $(filterElementHtml(filters.ipam_code.displayName, filters.ipam_code.id, filters.ipam_code.useFullRow)).appendTo(containerRow);
        filter_ipam_code_select = $(selectTag)
            .appendTo($(`#${filters.ipam_code.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_ipam_code_select.val());
                datatable
                    .column(filters.ipam_code.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.ipam_code.length; i++) {
            filter_ipam_code_select.append(
                `<option value="${datatableFilterData.data.ipam_code[i]}">${datatableFilterData.data.ipam_code[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.ipam_code.colIndex].search.search !== '') {
                $(`#${filters.ipam_code.id} option[value="${retriveColumnFilterData(stateData[filters.ipam_code.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // region filter
    var filter_region_select;
    if (filters.region && filters.region.display === true) {
        $(filterElementHtml(filters.region.displayName, filters.region.id, filters.region.useFullRow)).appendTo(containerRow);
        filter_region_select = $(selectTag)
            .appendTo($(`#${filters.region.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_region_select.val());
                datatable
                    .column(filters.region.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.region.length; i++) {
            filter_region_select.append(`<option value="${datatableFilterData.data.region[i]}">${datatableFilterData.data.region[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.region.colIndex].search.search !== '') {
                $(`#${filters.region.id} option[value="${retriveColumnFilterData(stateData[filters.region.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // sub_region filter
    var filter_sub_region_select;
    if (filters.sub_region && filters.sub_region.display === true) {
        $(filterElementHtml(filters.sub_region.displayName, filters.sub_region.id, filters.sub_region.useFullRow)).appendTo(containerRow);
        filter_sub_region_select = $(selectTag)
            .appendTo($(`#${filters.sub_region.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_sub_region_select.val());
                datatable
                    .column(filters.sub_region.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.sub_region.length; i++) {
            filter_sub_region_select.append(
                `<option value="${datatableFilterData.data.sub_region[i]}">${datatableFilterData.data.sub_region[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.sub_region.colIndex].search.search !== '') {
                $(`#${filters.sub_region.id} option[value="${retriveColumnFilterData(stateData[filters.sub_region.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // country filter
    var filter_country_select;
    if (filters.country && filters.country.display === true) {
        $(filterElementHtml(filters.country.displayName, filters.country.id, filters.country.useFullRow)).appendTo(containerRow);
        filter_country_select = $(selectTag)
            .appendTo($(`#${filters.country.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_country_select.val());
                datatable
                    .column(filters.country.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.country.length; i++) {
            filter_country_select.append(`<option value="${datatableFilterData.data.country[i]}">${datatableFilterData.data.country[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.country.colIndex].search.search !== '') {
                $(`#${filters.country.id} option[value="${retriveColumnFilterData(stateData[filters.country.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // city filter
    var filter_city_select;
    if (filters.city && filters.city.display === true) {
        $(filterElementHtml(filters.city.displayName, filters.city.id, filters.city.useFullRow)).appendTo(containerRow);
        filter_city_select = $(selectTag)
            .appendTo($(`#${filters.city.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_city_select.val());
                datatable
                    .column(filters.city.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.city.length; i++) {
            filter_city_select.append(`<option value="${datatableFilterData.data.city[i]}">${datatableFilterData.data.city[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.city.colIndex].search.search !== '') {
                $(`#${filters.city.id} option[value="${retriveColumnFilterData(stateData[filters.city.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // site_type filter
    var filter_site_type_select;
    if (filters.site_type && filters.site_type.display === true) {
        $(filterElementHtml(filters.site_type.displayName, filters.site_type.id, filters.site_type.useFullRow)).appendTo(containerRow);
        filter_site_type_select = $(selectTag)
            .appendTo($(`#${filters.site_type.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_site_type_select.val());
                datatable
                    .column(filters.site_type.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.site_type.length; i++) {
            filter_site_type_select.append(
                `<option value="${datatableFilterData.data.site_type[i]}">${datatableFilterData.data.site_type[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.site_type.colIndex].search.search !== '') {
                $(`#${filters.site_type.id} option[value="${retriveColumnFilterData(stateData[filters.site_type.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // site_name filter
    var filter_site_name_select;
    if (filters.site_name && filters.site_name.display === true) {
        $(filterElementHtml(filters.site_name.displayName, filters.site_name.id, filters.site_name.useFullRow)).appendTo(containerRow);
        filter_site_name_select = $(selectTag)
            .appendTo($(`#${filters.site_name.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_site_name_select.val());
                datatable
                    .column(filters.site_name.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.site_name.length; i++) {
            filter_site_name_select.append(
                `<option value="${datatableFilterData.data.site_name[i]}">${datatableFilterData.data.site_name[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.site_name.colIndex].search.search !== '') {
                $(`#${filters.site_name.id} option[value="${retriveColumnFilterData(stateData[filters.site_name.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // device_type filter
    var filter_device_type_select;
    if (filters.device_type && filters.device_type.display === true) {
        $(filterElementHtml(filters.device_type.displayName, filters.device_type.id, filters.device_type.useFullRow)).appendTo(containerRow);
        filter_device_type_select = $(selectTag)
            .appendTo($(`#${filters.device_type.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_device_type_select.val());
                datatable
                    .column(filters.device_type.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.device_type.length; i++) {
            filter_device_type_select.append(
                `<option value="${datatableFilterData.data.device_type[i]}">${datatableFilterData.data.device_type[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.device_type.colIndex].search.search !== '') {
                $(
                    `#${filters.device_type.id} option[value="${retriveColumnFilterData(stateData[filters.device_type.colIndex].search.search)}"]`
                ).prop('selected', true);
            }
        }
    }

    // kpi filter
    var filter_kpi_select;
    if (filters.kpi && filters.kpi.display === true) {
        $(filterElementHtml(filters.kpi.displayName, filters.kpi.id, filters.kpi.useFullRow)).appendTo(containerRow);
        filter_kpi_select = $(selectTag)
            .appendTo($(`#${filters.kpi.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_kpi_select.val());
                datatable
                    .column(filters.kpi.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.kpi.length; i++) {
            filter_kpi_select.append(`<option value="${datatableFilterData.data.kpi[i]}">${datatableFilterData.data.kpi[i]}</option>`);
        }

        // console.log('container', $(container))

        if (stateData) {
            if (stateData[filters.kpi.colIndex].search.search !== '') {
                $(`#${filters.kpi.id} option[value="${retriveColumnFilterData(stateData[filters.kpi.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // kpi_type filter
    var filter_kpi_type_select;
    if (filters.kpi_type && filters.kpi_type.display === true) {
        $(filterElementHtml(filters.kpi_type.displayName, filters.kpi_type.id, filters.kpi_type.useFullRow)).appendTo(containerRow);
        filter_kpi_type_select = $(selectTag)
            .appendTo($(`#${filters.kpi_type.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_kpi_type_select.val());
                datatable
                    .column(filters.kpi_type.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.kpi_type.length; i++) {
            filter_kpi_type_select.append(`<option value="${datatableFilterData.data.kpi_type[i]}">${datatableFilterData.data.kpi_type[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.kpi_type.colIndex].search.search !== '') {
                $(`#${filters.kpi_type.id} option[value="${retriveColumnFilterData(stateData[filters.kpi_type.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // impact_weight filter
    var filter_impact_weight_select;
    if (filters.impact_weight && filters.impact_weight.display === true) {
        $(filterElementHtml(filters.impact_weight.displayName, filters.impact_weight.id, filters.impact_weight.useFullRow)).appendTo(containerRow);
        filter_impact_weight_select = $(selectTag)
            .appendTo($(`#${filters.impact_weight.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_impact_weight_select.val());
                datatable
                    .column(filters.impact_weight.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.impact_weight.length; i++) {
            filter_impact_weight_select.append(
                `<option value="${datatableFilterData.data.impact_weight[i]}">${datatableFilterData.data.impact_weight[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.impact_weight.colIndex].search.search !== '') {
                $(
                    `#${filters.impact_weight.id} option[value="${retriveColumnFilterData(stateData[filters.impact_weight.colIndex].search.search)}"]`
                ).prop('selected', true);
            }
        }
    }

    // site score filter
    var filter_site_score_select;
    if (filters.site_score && filters.site_score.display === true) {
        $(filterElementHtml(filters.site_score.displayName, filters.site_score.id, filters.site_score.useFullRow)).appendTo(containerRow);
        filter_site_score_select = $(selectTag)
            .appendTo($(`#${filters.site_score.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_site_score_select.val());
                datatable
                    .column(filters.site_score.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.site_score.length; i++) {
            filter_site_score_select.append(
                `<option value="${datatableFilterData.data.site_score[i]}">${datatableFilterData.data.site_score[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.site_score.colIndex].search.search !== '') {
                $(`#${filters.site_score.id} option[value="${retriveColumnFilterData(stateData[filters.site_score.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // device score filter
    var filter_device_score_select;
    if (filters.device_score && filters.device_score.display === true) {
        $(filterElementHtml(filters.device_score.displayName, filters.device_score.id, filters.device_score.useFullRow)).appendTo(containerRow);
        filter_device_score_select = $(selectTag)
            .appendTo($(`#${filters.device_score.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_device_score_select.val());
                datatable
                    .column(filters.device_score.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.device_score.length; i++) {
            filter_device_score_select.append(
                `<option value="${datatableFilterData.data.device_score[i]}">${datatableFilterData.data.device_score[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.device_score.colIndex].search.search !== '') {
                $(
                    `#${filters.device_score.id} option[value="${retriveColumnFilterData(stateData[filters.device_score.colIndex].search.search)}"]`
                ).prop('selected', true);
            }
        }
    }

    // login filter
    var filter_login_select;
    if (filters.login && filters.login.display === true) {
        $(filterElementHtml(filters.login.displayName, filters.login.id, filters.login.useFullRow)).appendTo(containerRow);
        filter_login_select = $(selectTag)
            .appendTo($(`#${filters.login.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_login_select.val());
                datatable
                    .column(filters.login.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.login.length; i++) {
            filter_login_select.append(`<option value="${datatableFilterData.data.login[i]}">${datatableFilterData.data.login[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.login.colIndex].search.search !== '') {
                $(`#${filters.login.id} option[value="${retriveColumnFilterData(stateData[filters.login.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // applicable filter
    var filter_applicable_select;
    if (filters.applicable && filters.applicable.display === true) {
        $(filterElementHtml(filters.applicable.displayName, filters.applicable.id, filters.applicable.useFullRow)).appendTo(containerRow);
        filter_applicable_select = $(selectTag)
            .appendTo($(`#${filters.applicable.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_applicable_select.val());
                datatable
                    .column(filters.applicable.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.applicable.length; i++) {
            filter_applicable_select.append(
                `<option value="${datatableFilterData.data.applicable[i]}">${datatableFilterData.data.applicable[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.applicable.colIndex].search.search !== '') {
                $(`#${filters.applicable.id} option[value="${retriveColumnFilterData(stateData[filters.applicable.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // ssid filter
    var filter_ssid_select;
    if (filters.ssid && filters.ssid.display === true) {
        $(filterElementHtml(filters.ssid.displayName, filters.ssid.id, filters.ssid.useFullRow)).appendTo(containerRow);
        filter_ssid_select = $(selectTag)
            .appendTo($(`#${filters.ssid.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_ssid_select.val());
                datatable
                    .column(filters.ssid.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.ssid.length; i++) {
            filter_ssid_select.append(`<option value="${datatableFilterData.data.ssid[i]}">${datatableFilterData.data.ssid[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.ssid.colIndex].search.search !== '') {
                $(`#${filters.ssid.id} option[value="${retriveColumnFilterData(stateData[filters.ssid.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }
    // classification filter
    var filter_classification_select;
    if (filters.classification && filters.classification.display === true) {
        $(filterElementHtml(filters.classification.displayName, filters.classification.id, filters.classification.useFullRow)).appendTo(containerRow);
        filter_classification_select = $(selectTag)
            .appendTo($(`#${filters.classification.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_classification_select.val());
                datatable
                    .column(filters.classification.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.classification.length; i++) {
            filter_classification_select.append(
                `<option value="${datatableFilterData.data.classification[i]}">${datatableFilterData.data.classification[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.classification.colIndex].search.search !== '') {
                $(
                    `#${filters.classification.id} option[value="${retriveColumnFilterData(
                        stateData[filters.classification.colIndex].search.search
                    )}"]`
                ).prop('selected', true);
            }
        }
    }

    // status filter
    var filter_status_select;
    if (filters.status && filters.status.display === true) {
        $(filterElementHtml(filters.status.displayName, filters.status.id, filters.status.useFullRow)).appendTo(containerRow);
        filter_status_select = $(selectTag)
            .appendTo($(`#${filters.status.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_status_select.val());
                datatable
                    .column(filters.status.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.status.length; i++) {
            filter_status_select.append(`<option value="${datatableFilterData.data.status[i]}">${datatableFilterData.data.status[i]}</option>`);
        }

        if (stateData) {
            if (stateData[filters.status.colIndex].search.search !== '') {
                $(`#${filters.status.id} option[value="${retriveColumnFilterData(stateData[filters.status.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    // published filter
    var filter_published_select;
    if (filters.published && filters.published.display === true) {
        $(filterElementHtml(filters.published.displayName, filters.published.id, filters.published.useFullRow)).appendTo(containerRow);
        filter_published_select = $(selectTag)
            .appendTo($(`#${filters.published.id}`).empty())
            .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex(filter_published_select.val());
                datatable
                    .column(filters.published.colIndex)
                    .search(val ? '^' + val + '$' : '', true, false)
                    .draw();
            });

        for (let i = 0; i < datatableFilterData.data.published.length; i++) {
            filter_published_select.append(
                `<option value="${datatableFilterData.data.published[i]}">${datatableFilterData.data.published[i]}</option>`
            );
        }

        if (stateData) {
            if (stateData[filters.published.colIndex].search.search !== '') {
                $(`#${filters.published.id} option[value="${retriveColumnFilterData(stateData[filters.published.colIndex].search.search)}"]`).prop(
                    'selected',
                    true
                );
            }
        }
    }

    $(`<a id="filter-reset-btn" style="cursor: pointer; color: orange">Reset Filter</a>`)
        .appendTo($(containerFooter))
        .on('click', function () {
            if (filters.report && filters.report.display === true) {
                filter_report_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.ipam_code && filters.ipam_code.display === true) {
                filter_ipam_code_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.region && filters.region.display === true) {
                filter_region_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.sub_region && filters.sub_region.display === true) {
                filter_sub_region_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.country && filters.country.display === true) {
                filter_country_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.city && filters.city.display === true) {
                filter_city_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.site_name && filters.site_name.display === true) {
                filter_site_name_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.site_type && filters.site_type.display === true) {
                filter_site_type_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.device_type && filters.device_type.display === true) {
                filter_device_type_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.kpi && filters.kpi.display === true) {
                filter_kpi_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.kpi_type && filters.kpi_type.display === true) {
                filter_kpi_type_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.impact_weight && filters.impact_weight.display === true) {
                filter_impact_weight_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.site_score && filters.site_score.display === true) {
                filter_site_score_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.device_score && filters.device_score.display === true) {
                filter_device_score_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.login && filters.login.display === true) {
                filter_login_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.applicable && filters.applicable.display === true) {
                filter_applicable_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.ssid && filters.ssid.display === true) {
                filter_ssid_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.classification && filters.classification.display === true) {
                filter_classification_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.status && filters.status.display === true) {
                filter_status_select.prop('selectedIndex', 0).trigger('change');
            }
            if (filters.published && filters.published.display === true) {
                filter_published_select.prop('selectedIndex', 0).trigger('change');
            }
            datatable.search('').draw();

            // document.querySelectorAll('.dropdown-menu').forEach((select) => {
            //     select.classList.remove('show');
            // });

            // $('.dropdown-toggle').dropdown();
        });

    if (
        window.location.pathname === '/network-audits/compliance' ||
        window.location.pathname === '/network-audits/reports' ||
        window.location.pathname === '/cisco-dna-center/reports'
    ) {
        document.querySelectorAll('.form-select').forEach((select) => {
            $(select).on('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    let parent = 'body';
    if (options.select2dropdownParent !== undefined) {
        parent = options.select2dropdownParent;
    }

    const cont = document.querySelector(container)
    if (cont) {
        cont.querySelectorAll('.form-select')
            .forEach((select) => {
                $(select).select2({
                    width: 'resolve',
                    dropdownParent: $(parent),
                });
            });
    }

    let closestMenu;
    document.querySelectorAll(parent).forEach((container) => {
        container.querySelectorAll('.select2').forEach((select) => {
            select.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closestMenu = select.closest('.dropdown-menu');

                document.querySelectorAll(parent).forEach((container) => {
                    container.querySelectorAll('.select2-container--open').forEach((select) => {
                        select.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (closestMenu) {
                                closestMenu.classList.add('show');
                            }
                        });
                    });
                });
            });
        });
    });

    document.querySelectorAll('.dropdown-menu-select2').forEach((select) => {
        $(select).on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            select.classList.add('show');
        });
    });
};
