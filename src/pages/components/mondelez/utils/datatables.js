
/* React Utils */
import React from 'react';

import { Icon } from "../../../../components/Component";

export const GetScoreIconFill = ({ value, applicable, passingScore }) => {

    if (value >= passingScore && applicable === true) {
        return <Icon className='text-success pr-1' name="check-circle-fill" />;
    } else if (value < passingScore && applicable === true) {
        return <Icon className='text-danger pr-1' name="cross-circle-fill" />;
    } else if (applicable === false) {
        return <Icon className='text-muted pr-1' name="alert-circle-fill" />;
    }
    return;
}

export const GetScoreIcon = ({ score, passingScore }) => {
    if (score >= passingScore) {
        return <Icon className='text-success' name="check-circle" />;
    } else if (score < passingScore) {
        return <Icon className='text-danger' name="cross-circle" />;
    } else {
        return <Icon className='text-warning' name="alert-circle" />;
    }
}

export const GetTrueOrFalseIcon = ({value}) => {
    if (value === true) {
        return <em className='icon text-success ni ni-check-circle'></em>;
    } else if (value === false) {
        return <em className='icon text-danger ni ni-cross-circle'></em>;
    }
}



/* JS Utils */

export function checkNull(value) {
    if (value === null || value === '') {
        return '-';
    } else {
        return value;
    }
}

export function retriveColumnFilterData(string) {
    if (string.includes('$') && string.includes('^')) {
        let strLength = string.length;
        return string.slice(1, strLength - 1);
    } else {
        return string;
    }
}

export const setScoreColorWithScoreChange = (
    score,
    published,
    scoreChange,
    passingScore,
    reportId,
    ipamCode,
    opts = {
        additonalClasses: String,
        enablePointer: Boolean,
        siteTypeAttrValue: String,
    }
) => {
    let scoreData;
    if (score >= passingScore) {
        scoreData = `<div><a class="text-success ${opts.additonalClasses ? opts.additonalClasses : ''}" ${opts.enablePointer === true ? 'style="cursor: pointer;"' : ''
            } ${opts.siteTypeAttrValue ? `data-siteType="${opts.siteTypeAttrValue}"` : ''
            }><span data-toggle="tooltip" data-placement="right"  data-delay='{"show":"1000", "hide":"0"}' data-html="true" title='<ul style="list-style: none;"><li>Passing Score: ${passingScore}</li><li>Published on: ${published}</li></ul>'>${score}</span></a>${getScoreChange2(
                scoreChange
            )}</div>`;
    } else if (score > 0 && score < passingScore) {
        scoreData = `<div><a class="text-danger ${opts.additonalClasses ? opts.additonalClasses : ''}" ${opts.enablePointer === true ? 'style="cursor: pointer;"' : ''
            } ${opts.siteTypeAttrValue ? `data-siteType="${opts.siteTypeAttrValue}"` : ''
            }><span data-toggle="tooltip" data-placement="right"  data-delay='{"show":"1000", "hide":"0"}' data-html="true" title='<ul style="list-style: none;"><li>Passing Score: ${passingScore}</li><li>Published on: ${published}</li></ul>'>${score}</span></a>${getScoreChange2(
                scoreChange
            )}</div>`;
    } else {
        scoreData = `<p style="font-weight: 500;">-</p>`;
    }

    return scoreData;
}

export const setScoreColorChange = (scoreChange) => {
    if (scoreChange > 0) {
        return `<span class="text-success">${scoreChange}</span>`;
    } else if (scoreChange < 0) {
        return `<span class="text-danger">${scoreChange}</span>`;
    } else if (scoreChange === null || scoreChange === 0) {
        return `<p style="font-weight: 500;">-</p>`;
    }
}

export const getScoreChange2 = (scoreChange) => {
    if (scoreChange > 0) {
        return `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${scoreChange}</span>`;
    } else if (scoreChange < 0) {
        return `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>` + Math.abs(scoreChange) + `</span>`;
    } else if (scoreChange === null || scoreChange === 0) {
        return ``;
    }
}

export const capitalizeFirstLetter = (string) => {
    string = string.toString();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getScoreIconFill = (value, applicable, passingScore) => {
    if (value >= passingScore && applicable === true) {
        return `<em class='icon text-success ni ni-check-circle-fill'></em>`;
    } else if (value < passingScore && applicable === true) {
        return `<em class='icon text-danger ni ni-cross-circle-fill'></em>`;
    } else if (applicable === false) {
        return `<em class='icon text-muted ni ni-alert-circle-fill'></em>`;
    }
}

export const getScoreIcon = (score, passingScore) => {
    if (score >= passingScore) {
        return `<em class='icon text-success ni ni-check-circle'></em>`;
    } else if (score < passingScore) {
        return `<em class='icon text-danger ni ni-cross-circle'></em>`;
    } else {
        return `<em class='icon text-warning ni ni-alert-circle'></em>`;
    }
}

export const getTrueOrFalseIcon = (value) => {
    if (value === true) {
        return `<em class='icon text-success ni ni-check-circle'></em>`;
    } else if (value === false) {
        return `<em class='icon text-danger ni ni-cross-circle'></em>`;
    }
}