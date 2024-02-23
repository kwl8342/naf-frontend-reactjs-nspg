
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { getMinNumberFromDataset, getMaxNumberFromDataset, hexToRgba } from './utils';
import { externalTooltipHandlerForScore } from './externalTooltip';

Chart.register(...registerables);

export const ScoreComboChartwithLabels = ({ data }) => {
    const minNum = getMinNumberFromDataset(data);
    const maxNum = getMaxNumberFromDataset(data);

    return (
        <Line
            className="line-chart"
            data={data}
            options={{
                legend: {
                    display: data.legend,
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        fontColor: "#6783b8",
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                layout: {
                    padding: {
                        right: 25,
                    },
                },
                tooltips: {
                    enabled: true,
                    backgroundColor: "#eff6ff",
                    titleFontSize: 13,
                    titleFontColor: "#6783b8",
                    titleMarginBottom: 6,
                    bodyFontColor: "#9eaecf",
                    bodyFontSize: 12,
                    bodySpacing: 4,
                    yPadding: 10,
                    xPadding: 10,
                    footerMarginTop: 0,
                    displayColors: false,
                },
                plugins: {
                    tooltip: {
                        position: 'nearest',
                        enabled: false,
                        external: externalTooltipHandlerForScore,
                    },
                    legend: {
                        display: data.legend ? data.legend : false,
                        labels: {
                            boxWidth: 30,
                            padding: 20,
                            fontColor: '#6783b8',
                        },
                        position: 'bottom',
                        align: 'start',
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                                speed: 0.2,
                                modifierKey: 'alt',
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'xy',
                            drag: {
                                enabled: true,
                            },
                        },
                        limits: {
                            y: { min: 0, max: 100 },
                        },
                    },
                },
                scales: {
                    y: {
                        display: true,
                        stacked: data.stacked ? data.stacked : false,
                        min: minNum - 1 < 0 ? 0 : minNum - 1,
                        max: maxNum + 2,
                        beginAtZero: false,
                        ticks: {
                            font: {
                                size: 11,
                                color: '#9eaecf',
                            },
                            source: 'auto',
                            padding: 10,
                            callback: function (value, index, values) {
                                return parseInt(value);
                            },
                            // stepSize: 10,
                        },
                        grid: {
                            color: hexToRgba('#526484', 0.2),
                            tickLength: 0,
                        },
                    },
                    x: {
                        display: true,
                        stacked: data.stacked ? data.stacked : false,
                        ticks: {
                            font: {
                                size: 9,
                                color: '#9eaecf',
                            },
                            source: 'auto',
                            padding: 10,
                            callback: function (value) {
                                let labelText = this.getLabelForValue(value);
                                if (labelText.toString().includes(':')) {
                                    let arr = labelText.split(':');
                                    return arr[0];
                                } else {
                                    return labelText;
                                }
                            },
                        },
                        grid: {
                            color: hexToRgba('#526484', 0.2),
                            tickLength: 0,
                        },
                    },
                },
            }}
        />
    );
};