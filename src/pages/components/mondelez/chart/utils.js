import hexRgb from 'hex-rgb';

export const hexToRgba = (hexCode, alpha) => {
    const rgb = hexRgb(hexCode);
    return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha ? alpha : rgb.alpha})`
}

export const getMinNumberFromDataset = (data) => {
    let array = [];
    for (let i = 0; i < data.datasets.length; i++) {
        let dataArray = data.datasets[i].data;
        if (dataArray !== undefined) {
            let filteredDataArr = dataArray.filter((data) => data !== null);
            array.push(parseInt(Math.min(...filteredDataArr).toFixed()));
        }
    }
    if (array.length > 0) {
        return Math.min(...array);
    } else {
        return null;
    }
}

export const getMaxNumberFromDataset = (data) => {
    let array = [];
    for (let i = 0; i < data.datasets.length; i++) {
        let dataArray = data.datasets[i].data;
        if (dataArray !== undefined) {
            let filteredDataArr = dataArray.filter((data) => data !== null);
            array.push(parseInt(Math.max(...filteredDataArr).toFixed()));
        }
    }
    if (array.length > 0) {
        return parseInt(Math.max(...array));
    } else {
        return null;
    }
}

export const getQueryParamsString = (report, ssid, from, to, frequency) => {
    let query = '';
    if (report) {
        query += `&report=${report}`;
    }
    if (ssid) {
        query += `&ssid=${ssid}`;
    }
    if (from) {
        query += `&from=${from}`;
    }
    if (to) {
        query += `&to=${to}`;
    }
    if (frequency) {
        query += `&frequency=${frequency}`;
    }
    return query;
};