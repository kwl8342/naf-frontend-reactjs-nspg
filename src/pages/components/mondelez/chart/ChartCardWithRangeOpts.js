import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ScoreComboChartwithLabels } from './ScoreComboChartwithLabels';
import $ from 'jquery';
import { getQueryParamsString } from './utils';
import { secureAxios } from '../../../../utils/nspgApi';
import RSelect2 from "../select/ReactSelect2";
import CardLoadingBlock from '../utils/CardLoadingBlock';
$.tooltip = require('../../../../../node_modules/bootstrap/js/src/tooltip');

let controller;

export const ChartCardWithRangeOpts = (
    {
        url,
        kpi,
        options = {
            title: String,
            titleTooltip: String,
            subTitle: String,
            maxHeight: String,
            style: Object,
            hideOptBtns: Boolean,
            reloadBtn: Boolean,
            btnExtension: String,
            showOptDropdown: {
                display: Boolean,
                optionsData: Array,
            },
            showViewAllBtn: {
                display: Boolean,
                openModalFunction: Function,
            },
        },
        getChartDataFunc,
        region,
        ipam,
        siteType,
        selectedFrequency
    }
) => {
    const containerRef = useRef(null)
    let ext = options.btnExtension !== undefined ? `-${options.btnExtension}` : '';
    const [chartData, setChartData] = useState({});
    const [fetchedData, setFetchedData] = useState(null);
    const [frequency, setFrequency] = useState(selectedFrequency ? selectedFrequency : 'monthly');
    const refreshFlag = useRef(false);
    const frequencies = ['daily', 'weekly', 'monthly']
    const [reqUrl] = useState(url)
    const [selectedKpiType, setSelectedKpiType] = useState(null);
    const [kpiDropdownOpts, setKpiDropdownOpts] = useState([]);

    const changeFrequency = (e) => {
        e.preventDefault();
        setFrequency(e.target.dataset.frequency)
    }

    const reloadChart = (e) => {
        e.preventDefault();
        refreshFlag.current = true;
        loadChartData()
    }
    const loadChartData = useCallback(
        async () => {
            if (controller && controller.requestUrl === reqUrl) {
                controller.abort();
                console.log("❌ Aborted the previous request!");
            }
            controller = new AbortController()
            controller.requestUrl = reqUrl;

            secureAxios(
                {
                    method: 'GET',
                    url: `${reqUrl}${refreshFlag.current === true ? '&refresh=true' : ''
                        }${selectedKpiType ? `&kpi=${selectedKpiType}` : ''
                        }${getQueryParamsString(
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            frequency
                        )}`,
                    signal: controller.signal,
                },
                'ARMS'
            )
                .then((res) => {
                    if (res) {
                        const data = res.data;
                        setFetchedData(data)

                        if (getChartDataFunc && siteType) {
                            setChartData(getChartDataFunc(data, siteType))
                        } else if (getChartDataFunc) {
                            setChartData(getChartDataFunc(data, region, ipam, kpi))
                        } else {
                            setChartData({
                                labels: data.labels,
                                dataUnit: '',
                                legend: true,
                                datasets: [
                                    {
                                        label: ` AMEA `,
                                        data: data.data.amea,
                                        fill: false,
                                        borderColor: 'rgba(45, 110, 170, 0.25)',
                                        backgroundColor: 'rgba(45, 110, 170, 0.8)',
                                        order: 0
                                    },
                                    {
                                        label: ` LA `,
                                        data: data.data.la,
                                        fill: false,
                                        borderColor: 'rgba(102, 102, 102, 0.25)',
                                        backgroundColor: 'rgba(102, 102, 102, 0.8)',
                                        order: 0
                                    },
                                    {
                                        label: ` MEU `,
                                        data: data.data.meu,
                                        fill: false,
                                        borderColor: 'rgba(98, 62, 35, 0.25)',
                                        backgroundColor: 'rgba(98, 62, 35, 0.8)',
                                        order: 0
                                    },
                                    {
                                        label: ` NA `,
                                        data: data.data.na,
                                        fill: false,
                                        borderColor: 'rgba(79, 33, 112, 0.25)',
                                        backgroundColor: 'rgba(79, 33, 112, 0.8)',
                                        order: 0
                                    },
                                    {
                                        label: ` Overall `,
                                        data: data.data.overall,
                                        fill: false,
                                        borderColor: 'rgba(79, 33, 112, 0.25)',
                                        backgroundColor: 'rgba(39, 120, 25, 0.25)',
                                        order: 1,
                                        type: 'bar'
                                    }
                                ]
                            });
                        }
                        refreshFlag.current = false;

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            // eslint-disable-next-line
        }, [reqUrl, frequency, selectedKpiType, getChartDataFunc, region, ipam,])

    useEffect(() => {
        loadChartData();
    }, [frequency, loadChartData, selectedKpiType]);

    useEffect(() => {

        if (options.showOptDropdown && options.showOptDropdown.display === true) {

            if (kpi) {
                setSelectedKpiType(kpi)
            } else {
                setSelectedKpiType('WL00043_SAME_WLC')
            }

            let opts = [];
            options.showOptDropdown.optionsData.forEach((data) => {
                opts.push({ value: data.tag, label: data.title })

            });
            // setKpiOpts(opts)

            // $(document).ready(function () {
            //     $(chartRef.current).parent().parent().find('#chartDropdownOpts').select2({
            //         width: 'resolve',
            //     });
            // });
            setKpiDropdownOpts(opts)
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFrequency(selectedFrequency)
        setFetchedData(null)
    }, [url, selectedFrequency])

    return (
        <>
            {
                fetchedData
                    ?
                    <div className="card card-bordered card-full" ref={containerRef}>
                        <div className="card-inner card-inner-flex h-100">
                            <div className="card-title-group card-inner-flex-title">
                                <div className={`card-title ${options.showOptDropdown && options.showOptDropdown.display === true && options.hideOptBtns === true ? 'col-5' : ''
                                    } ${options.showOptDropdown && options.showOptDropdown.display === true && options.hideOptBtns !== true ? 'col-5' : ''}`}>
                                    <h6>
                                        <span className="title" data-toggle="tooltip" data-placement="left" data-html="true" title={options.titleTooltip}>{fetchedData && fetchedData.title ? fetchedData.title : options.title}</span>
                                    </h6>
                                    <p className="d-none d-sm-block" id="chartSubTitle">{fetchedData && fetchedData.description ? fetchedData.description : options.subTitle}</p>
                                </div>
                                <div className={`card-tools shrink-0 d-none d-sm-block ${options.showOptDropdown && options.showOptDropdown.display === true && options.hideOptBtns === true ? 'col-7' : ''
                                    } ${options.showOptDropdown && options.showOptDropdown.display === true && options.hideOptBtns !== true ? 'col-7' : ''}`}>

                                    <div className="row pr-2 d-flex flex-column">
                                        {options.showViewAllBtn?.display
                                            ? <a
                                                href="#viewall"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (typeof options.showViewAllBtn.openModalFunction === 'function') {
                                                        options.showViewAllBtn.openModalFunction();
                                                    }
                                                }}
                                                className="link d-none d-sm-inline"
                                            >View All</a>
                                            : ''
                                        }
                                        {options.showOptDropdown && options.showOptDropdown.display === true && kpiDropdownOpts.length > 0
                                            ? <RSelect2
                                                style={{ minWidth: "290px" }}
                                                isClearable={true}
                                                value={kpiDropdownOpts.filter(obj => obj.value === selectedKpiType)}
                                                onChange={(e) => setSelectedKpiType(e.value)}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                // menuPortalTarget={document.querySelector(this).parentElement().parentElement().parentElement()}
                                                options={kpiDropdownOpts}
                                            >
                                            </RSelect2>
                                            : ''
                                        }
                                        <div className="d-flex flex-row-reverse">
                                            <ul className="nav nav-switch-s2 nav-tabs bg-white chartBtns" id={`chartBtns${ext}`}>
                                                {options.hideOptBtns === true
                                                    ? ``
                                                    : <>
                                                        {
                                                            frequencies.map((freq, idx) => {
                                                                return (
                                                                    <li key={idx} className="nav-item "><a href={`#${freq}`} onClick={(e) => { changeFrequency(e) }} className={`nav-link ${freq === frequency ? 'active' : ''}`} data-frequency={freq} style={idx === 2 ? { borderRadius: "0 4px 4px 0" } : {}}>{freq}</a></li>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                }
                                                {options.reloadBtn === true
                                                    ? <>
                                                        {options.hideOptBtns === true ? '' : <li className="ml-1"></li>}
                                                        < li className="nav-item"><a href="#reload" onClick={(e) => { reloadChart(e) }} className="nav-link icon-btn" data-toggle="tooltip" data-placement="left" data-delay='{"show":"1000", "hide":"0"}' title="Reload Chart" id="reloadBtn"><em className="icon ni ni-reload"></em></a></li>
                                                    </>
                                                    : ''
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 h-100 card-inner-flex-body" style={options.maxHeight ? { maxHeight: options.maxHeight } : options.style ? options.style : ''} id="canvasContainer">
                                {chartData && !$.isEmptyObject(chartData) ? (
                                    <ScoreComboChartwithLabels data={chartData} />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <CardLoadingBlock minHeight={'400px'} />
            }
        </>
    )
};

export const getKpiResultsChartData = (data, region, ipam) => {
    let chartData;

    if (region === 'AMEA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${ipam} `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'LA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${ipam} `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'MEU') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${ipam} `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'NA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${ipam} `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${ipam} `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${ipam} `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${ipam} `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${ipam} `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    }

    return chartData;
}

export const getKpiResultsChartDataByRegion = (data, region) => {
    let chartData;

    if (region === 'AMEA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` AMEA `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'LA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` LA `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'MEU') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` MEU `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'NA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` NA `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` AMEA `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` LA `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` MEU `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` NA `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    }

    return chartData;
}

export const getSitesResultsChartData = (data, region, ipam, kpi) => {
    let chartData;

    if (region === 'AMEA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${kpi} `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'LA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${kpi} `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'MEU') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${kpi} `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else if (region === 'NA') {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${kpi} `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    } else {
        chartData = {
            labels: data.labels,
            dataUnit: '',
            datasets: [
                {
                    label: ` ${kpi} `,
                    data: data.data.amea,
                    fill: false,
                    borderColor: 'rgba(45, 110, 170, 0.25)',
                    backgroundColor: 'rgba(45, 110, 170, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${kpi} `,
                    data: data.data.la,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${kpi} `,
                    data: data.data.meu,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` ${kpi} `,
                    data: data.data.na,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
            ],
        };
    }

    return chartData;
}

export const getSitesResultsChartDataBySiteType = (data, siteType) => {
    let chartData;

    if (siteType && siteType.toLowerCase() === 'firewall') {
        chartData = {
            labels: data.data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
                {
                    label: ` Firewall `,
                    data: data.data.firewall,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
            ],
        };
    } else if (siteType && siteType.toLowerCase() === 'wireless') {
        chartData = {
            labels: data.data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
                {
                    label: ` Wireless `,
                    data: data.data.wireless,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
            ],
        };
    } else if (siteType && siteType.toLowerCase() === 'switch') {
        chartData = {
            labels: data.data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    order: 1,
                    type: 'bar',
                },
                {
                    label: ` Switch `,
                    data: data.data.switch,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
            ],
        };
    } else {
        chartData = {
            labels: data.data.labels,
            dataUnit: '',
            legend: true,
            datasets: [
                {
                    label: ` Overall `,
                    data: data.data.overall,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(39, 120, 25, 0.25)',
                    type: 'bar',
                    order: 1,
                },
                {
                    label: ` Firewall `,
                    data: data.data.firewall,
                    fill: false,
                    borderColor: 'rgba(102, 102, 102, 0.25)',
                    backgroundColor: 'rgba(102, 102, 102, 0.8)',
                    order: 0,
                },
                {
                    label: ` Switch `,
                    data: data.data.switch,
                    fill: false,
                    borderColor: 'rgba(98, 62, 35, 0.25)',
                    backgroundColor: 'rgba(98, 62, 35, 0.8)',
                    order: 0,
                },
                {
                    label: ` Wireless `,
                    data: data.data.wireless,
                    fill: false,
                    borderColor: 'rgba(79, 33, 112, 0.25)',
                    backgroundColor: 'rgba(79, 33, 112, 0.8)',
                    order: 0,
                },
            ],
        };
    }
    return chartData;
}