
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DoughnutChartWithCustomCenterText = ({ data, style, className }) => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const temp = []
        data.datasets.forEach((d) => {
            temp.push({
                backgroundColor: d.background,
                borderWidth: 2,
                borderColor: d.borderColor,
                hoverBorderColor: d.borderColor,
                data: d.data,
                centerTextConfig: {
                    display: true,
                    text: d.centerText,
                    color: '#4f2170',
                    fontStyle: 'Calibri',
                    sidePadding: 20,
                    minFontSize: 15,
                    lineHeight: 25,
                },
            });
        })
        setChartData(temp)
    }, [data]);

    return (
        <>
            {chartData ?
                <Doughnut
                    className={className}
                    style={style}
                    data={{
                        labels: data.labels,
                        datasets: chartData,
                    }}
                    options={{
                        rotation: 15,
                        cutout: data.cutout ? data.cutout : '80%',
                        maintainAspectRatio: false,
                        responsive: true,
                        animation: {
                            duration: 1,
                        },
                        plugins: {
                            legend: {
                                display: data.legend ? data.legend : false,
                                labels: {
                                    boxWidth: 12,
                                    padding: 20,
                                    font: {
                                        color: '#6783b8',
                                    },
                                },
                                position: 'bottom',
                                align: 'center',
                            },
                            tooltip: {
                                enabled: true,
                                rtl: false,
                                callbacks: {
                                    title: function (tooltipItem) {
                                        return tooltipItem[0]['label'];
                                    },
                                    label: function (tooltipItem) {
                                        return tooltipItem.parsed + ' ' + data.dataUnit;
                                    },
                                },
                                position: 'nearest',
                                backgroundColor: '#fff',
                                titleFont: {
                                    size: 15,
                                    family: 'MDLZBITETYPE',
                                },
                                titleColor: '#4f2170',
                                titleMarginBottom: 6,
                                bodyColor: '#4f2170',
                                titleAlign: 'center',
                                bodySpacing: 4,
                                bodyFont: {
                                    size: 13,
                                    family: 'Calibri',
                                },
                                padding: 10,
                                borderColor: '#e3d0f1',
                                borderWidth: 1,
                                displayColors: false,
                                footerMarginTop: 0,
                            },
                        },

                    }}
                    plugins={[
                        {
                            beforeDraw: function (chart) {
                                const centerTextConfig = chart.config._config.data.datasets[0].centerTextConfig
                                if (
                                    centerTextConfig.display !== null &&
                                    typeof centerTextConfig.display !== 'undefined' &&
                                    centerTextConfig.display === true
                                ) {
                                    // Get ctx from string
                                    var ctx = chart.ctx;

                                    // Get options from the center object in options
                                    var centerConfig = centerTextConfig;
                                    var fontStyle = centerConfig.fontStyle || 'Arial';
                                    var txt = centerConfig.text;
                                    var color = centerConfig.color || '#000';
                                    var maxFontSize = centerConfig.maxFontSize || 80;
                                    var sidePadding = centerConfig.sidePadding || 20;
                                    var innerRadius = chart._metasets[chart._metasets.length - 1].data[0].innerRadius;
                                    var sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);

                                    // Start with a base font of 30px
                                    ctx.font = '30px ' + fontStyle;

                                    // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                                    var stringWidth = ctx.measureText(txt).width;
                                    var elementWidth = innerRadius * 2 - sidePaddingCalculated;

                                    // Find out how much the font can grow in width.
                                    var widthRatio = elementWidth / stringWidth;
                                    var newFontSize = Math.floor(30 * widthRatio);
                                    var elementHeight = innerRadius * 2;

                                    // Pick a new font size so it will not be larger than the height of label.
                                    var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                                    var minFontSize = centerConfig.minFontSize;
                                    var lineHeight = centerConfig.lineHeight || 25;
                                    var wrapText = false;

                                    if (minFontSize === undefined) {
                                        minFontSize = 15;
                                    }

                                    if (minFontSize && fontSizeToUse < minFontSize) {
                                        fontSizeToUse = minFontSize;
                                        wrapText = true;
                                    }

                                    // Set font settings to draw it correctly.
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                                    var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                                    ctx.font = fontSizeToUse + 'px ' + fontStyle;
                                    ctx.fillStyle = color;

                                    if (!wrapText) {
                                        ctx.fillText(txt, centerX, centerY);
                                        return;
                                    }

                                    var words = txt.toString().split(' ');
                                    var line = '';
                                    var lines = [];

                                    // Break words up into multiple lines if necessary
                                    for (var n = 0; n < words.length; n++) {
                                        var testLine = line + words[n] + ' ';
                                        var metrics = ctx.measureText(testLine);
                                        var testWidth = metrics.width;
                                        if (testWidth > elementWidth && n > 0) {
                                            lines.push(line);
                                            line = words[n] + ' ';
                                        } else {
                                            line = testLine;
                                        }
                                    }

                                    // Move the center up depending on line height and number of lines
                                    centerY -= (lines.length / 2) * lineHeight;

                                    for (var k = 0; k < lines.length; k++) {
                                        ctx.fillText(lines[k], centerX, centerY);
                                        centerY += lineHeight;
                                    }
                                    //Draw text in center
                                    ctx.fillText(line, centerX, centerY);
                                }
                            },
                        },
                    ]}
                />
                :
                ''}

        </>
    );
};

export default DoughnutChartWithCustomCenterText;