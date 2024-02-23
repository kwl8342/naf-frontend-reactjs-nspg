import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import '../../../../../../node_modules/jqvmap/dist/jqvmap.min.css';
import initWorldMap from './jqvmap/initWorldMap';
window.$ = window.jQuery = $;
$.vectorMap = require('jqvmap');

let regionMap;

const GlobalOverviewMap = ({ regionalData, toggleGlobalOverviewModal }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setRegionMapData(regionalData);
    initWorldMap();

    if (!mapLoaded) {
      $('#vmap').vectorMap({
        map: 'world_en',
        backgroundColor: 'transparent',
        borderColor: '#4F2170',
        borderOpacity: 1,
        borderWidth: 1,
        colors: countryColorsMdlz,
        enableZoom: false,
        hoverOpacity: 0.8,
        normalizeFunction: 'linear',
        showTooltip: true,
        onResize: function (element, width, height) {},
        onRegionClick: function (event, code, region) {
          if (getRegion(code)) {
            let region = getRegion(code);
            // $(`#modalRegionScoresDetails`).modal('toggle', {
            //     dataset: {
            //         region: region.name,
            //         target: '#modalRegionScoresDetails',
            //     },
            // });
          }
        },
        onRegionOver: function (element, code, region) {
          highlightRegionOfCountry(code);
        },
        onRegionOut: function (element, code, region) {
          unhighlightRegionOfCountry(code);
        },
        onLabelShow: function (event, label, code) {
          const region = getRegion(code);
          label.html(mapMouseOver(region));
        }
      });
      setMapLoaded(true);
    }
  }, [mapLoaded, regionalData]);

  return (
    <div className="card card-bordered h-100 card-inner-flex">
      <div className="card-inner border-bottom card-inner-flex-title">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Global Overview</h6>
          </div>
          <div className="card-tools">
            <a
              href="#viewAll"
              className="link"
              onClick={(e) => {
                e.preventDefault();
                toggleGlobalOverviewModal();
              }}
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <div className="card-inner card-inner-flex-body" id="naf-map-container">
        {regionalData ? <div id="vmap" style={{ width: '100%', minHeight: '550px', zIndex: '10 !important' }}></div> : ''}
      </div>
    </div>
  );
};

export default GlobalOverviewMap;

const setRegionMapData = (regionData) => {
  regionMap = {
    LA: {
      countries: [
        'ar',
        'br',
        'cl',
        'co',
        'cr',
        'ec',
        'hn',
        'mx',
        'py',
        'pe',
        'uy',
        'bo',
        'ni',
        'pa',
        've',
        'cu',
        'do',
        'gf',
        'sr',
        'gy',
        'gt',
        'fk',
        'sv'
      ],
      name: 'LA',
      color: 'rgba(129, 129, 129, 0.2)',
      data: getRegionData('LA', regionData)
    },
    AMEA: {
      countries: [
        'au',
        'cn',
        'eg',
        'gh',
        'in',
        'id',
        'jp',
        'my',
        'ma',
        'nz',
        'ng',
        'pk',
        'ph',
        'sa',
        'za',
        'sz',
        'th',
        'dz',
        'ao',
        'bj',
        'bw',
        'bf',
        'bi',
        'cm',
        'cv',
        'cf',
        'td',
        'km',
        'cd',
        'cg',
        'ci',
        'dj',
        'eg',
        'gq',
        'er',
        'et',
        'ga',
        'gm',
        'gw',
        'gn',
        'ke',
        'ls',
        'lr',
        'ly',
        'mg',
        'mw',
        'ml',
        'mr',
        'mu',
        'ma',
        'mz',
        'na',
        'ne',
        're',
        'rw',
        'st',
        'sn',
        'sc',
        'sl',
        'so',
        'sd',
        'sz',
        'tz',
        'tg',
        'tn',
        'ug',
        'zm',
        'zw',
        'tm',
        'om',
        'ir',
        'kr',
        'kp',
        'az',
        'tw',
        'pg',
        'ye',
        'lk',
        'af',
        'ae',
        'tj',
        'kg',
        'mm',
        'la',
        'vn',
        'kh',
        'mv',
        'jo',
        'cy',
        'qa',
        'lb',
        'il',
        'sy',
        'iq',
        'kw',
        'uz',
        'np',
        'bd'
      ],
      name: 'AMEA',
      color: 'rgba(64, 118, 204, 0.2)',
      data: getRegionData('AMEA', regionData)
    },
    MEU: {
      countries: [
        'by',
        'at',
        'be',
        'bg',
        'cz',
        'dk',
        'fi',
        'fr',
        'ge',
        'de',
        'gr',
        'hu',
        'ie',
        'it',
        'kz',
        'lt',
        'nl',
        'no',
        'pl',
        'pt',
        'ro',
        'rs',
        'sk',
        'si',
        'es',
        'se',
        'ch',
        'tr',
        'ua',
        'ru',
        'gb',
        'mn',
        'is',
        'al',
        'mk',
        'ba',
        'hr',
        'am',
        'ee'
      ],
      name: 'MEU',
      color: 'rgba(137, 99, 49, 0.2)',
      data: getRegionData('MEU', regionData)
    },
    NA: {
      countries: ['ca', 'us', 'bs', 'gl'],
      name: 'NA',
      color: 'rgba(123, 45, 153, 0.2)',
      data: getRegionData('NA', regionData)
    }
  };
};

const countryColorsMdlz = {
  ae: 'rgba(64, 118, 204, 0.2)',
  af: 'rgba(64, 118, 204, 0.2)',
  ag: '#FFFFFF',
  al: 'rgba(137, 99, 49, 0.2)',
  am: 'rgba(137, 99, 49, 0.2)',
  ao: 'rgba(64, 118, 204, 0.2)',
  ar: 'rgba(129, 129, 129, 0.2)',
  at: 'rgba(137, 99, 49, 0.2)',
  au: 'rgba(64, 118, 204, 0.2)',
  az: 'rgba(64, 118, 204, 0.2)',
  ba: 'rgba(137, 99, 49, 0.2)',
  bb: '#FFFFFF',
  bd: 'rgba(64, 118, 204, 0.2)',
  be: 'rgba(137, 99, 49, 0.2)',
  bf: 'rgba(64, 118, 204, 0.2)',
  bg: 'rgba(137, 99, 49, 0.2)',
  bh: '#FFFFFF',
  bi: 'rgba(64, 118, 204, 0.2)',
  bj: 'rgba(64, 118, 204, 0.2)',
  bn: '#FFFFFF',
  bo: 'rgba(129, 129, 129, 0.2)',
  br: 'rgba(129, 129, 129, 0.2)',
  bs: 'rgba(123, 45, 153, 0.2)',
  bt: '#FFFFFF',
  bw: 'rgba(64, 118, 204, 0.2)',
  by: 'rgba(137, 99, 49, 0.2)',
  bz: '#FFFFFF',
  ca: 'rgba(123, 45, 153, 0.2)',
  cd: 'rgba(64, 118, 204, 0.2)',
  cf: 'rgba(64, 118, 204, 0.2)',
  cg: 'rgba(64, 118, 204, 0.2)',
  ch: 'rgba(137, 99, 49, 0.2)',
  ci: 'rgba(64, 118, 204, 0.2)',
  cl: 'rgba(129, 129, 129, 0.2)',
  cm: 'rgba(64, 118, 204, 0.2)',
  cn: 'rgba(64, 118, 204, 0.2)',
  co: 'rgba(129, 129, 129, 0.2)',
  cr: 'rgba(129, 129, 129, 0.2)',
  cu: 'rgba(129, 129, 129, 0.2)',
  cv: 'rgba(64, 118, 204, 0.2)',
  cy: 'rgba(64, 118, 204, 0.2)',
  cz: 'rgba(137, 99, 49, 0.2)',
  de: 'rgba(137, 99, 49, 0.2)',
  dj: 'rgba(64, 118, 204, 0.2)',
  dk: 'rgba(137, 99, 49, 0.2)',
  dm: '#FFFFFF',
  dn: '#FFFFFF',
  do: 'rgba(129, 129, 129, 0.2)',
  ds: '#FFFFFF',
  dz: 'rgba(64, 118, 204, 0.2)',
  ec: 'rgba(129, 129, 129, 0.2)',
  ee: 'rgba(137, 99, 49, 0.2)',
  eg: 'rgba(64, 118, 204, 0.2)',
  er: 'rgba(64, 118, 204, 0.2)',
  es: 'rgba(137, 99, 49, 0.2)',
  et: 'rgba(64, 118, 204, 0.2)',
  fi: 'rgba(137, 99, 49, 0.2)',
  fj: '#FFFFFF',
  fk: 'rgba(129, 129, 129, 0.2)',
  fr: 'rgba(137, 99, 49, 0.2)',
  ga: 'rgba(64, 118, 204, 0.2)',
  gb: 'rgba(137, 99, 49, 0.2)',
  gd: '#FFFFFF',
  ge: 'rgba(137, 99, 49, 0.2)',
  gf: 'rgba(129, 129, 129, 0.2)',
  gh: 'rgba(64, 118, 204, 0.2)',
  gl: 'rgba(123, 45, 153, 0.2)',
  gm: 'rgba(64, 118, 204, 0.2)',
  gn: 'rgba(64, 118, 204, 0.2)',
  gq: 'rgba(64, 118, 204, 0.2)',
  gr: 'rgba(137, 99, 49, 0.2)',
  gt: 'rgba(129, 129, 129, 0.2)',
  gw: 'rgba(64, 118, 204, 0.2)',
  gy: 'rgba(129, 129, 129, 0.2)',
  hn: 'rgba(129, 129, 129, 0.2)',
  hr: 'rgba(137, 99, 49, 0.2)',
  ht: '#FFFFFF',
  hu: 'rgba(137, 99, 49, 0.2)',
  id: 'rgba(64, 118, 204, 0.2)',
  ie: 'rgba(137, 99, 49, 0.2)',
  il: 'rgba(64, 118, 204, 0.2)',
  in: 'rgba(64, 118, 204, 0.2)',
  iq: 'rgba(64, 118, 204, 0.2)',
  ir: 'rgba(64, 118, 204, 0.2)',
  is: 'rgba(137, 99, 49, 0.2)',
  it: 'rgba(137, 99, 49, 0.2)',
  jm: '#FFFFFF',
  jo: 'rgba(64, 118, 204, 0.2)',
  jp: 'rgba(64, 118, 204, 0.2)',
  ke: 'rgba(64, 118, 204, 0.2)',
  kg: 'rgba(64, 118, 204, 0.2)',
  kh: 'rgba(64, 118, 204, 0.2)',
  km: 'rgba(64, 118, 204, 0.2)',
  kn: '#FFFFFF',
  kp: 'rgba(64, 118, 204, 0.2)',
  kr: 'rgba(64, 118, 204, 0.2)',
  kw: 'rgba(64, 118, 204, 0.2)',
  kz: 'rgba(137, 99, 49, 0.2)',
  la: 'rgba(64, 118, 204, 0.2)',
  lb: 'rgba(64, 118, 204, 0.2)',
  lc: '#FFFFFF',
  lk: 'rgba(64, 118, 204, 0.2)',
  lr: 'rgba(64, 118, 204, 0.2)',
  ls: 'rgba(64, 118, 204, 0.2)',
  lt: 'rgba(137, 99, 49, 0.2)',
  lv: '#FFFFFF',
  ly: 'rgba(64, 118, 204, 0.2)',
  ma: 'rgba(64, 118, 204, 0.2)',
  md: '#FFFFFF',
  mg: 'rgba(64, 118, 204, 0.2)',
  mk: 'rgba(137, 99, 49, 0.2)',
  ml: 'rgba(64, 118, 204, 0.2)',
  mm: 'rgba(64, 118, 204, 0.2)',
  mn: 'rgba(137, 99, 49, 0.2)',
  mr: 'rgba(64, 118, 204, 0.2)',
  mt: '#FFFFFF',
  mu: 'rgba(64, 118, 204, 0.2)',
  mv: 'rgba(64, 118, 204, 0.2)',
  mw: 'rgba(64, 118, 204, 0.2)',
  mx: 'rgba(129, 129, 129, 0.2)',
  my: 'rgba(64, 118, 204, 0.2)',
  mz: 'rgba(64, 118, 204, 0.2)',
  na: 'rgba(64, 118, 204, 0.2)',
  nc: '#FFFFFF',
  ne: 'rgba(64, 118, 204, 0.2)',
  ng: 'rgba(64, 118, 204, 0.2)',
  ni: 'rgba(129, 129, 129, 0.2)',
  nl: 'rgba(137, 99, 49, 0.2)',
  no: 'rgba(137, 99, 49, 0.2)',
  np: 'rgba(64, 118, 204, 0.2)',
  nz: 'rgba(64, 118, 204, 0.2)',
  om: 'rgba(64, 118, 204, 0.2)',
  pa: 'rgba(129, 129, 129, 0.2)',
  pe: 'rgba(129, 129, 129, 0.2)',
  pf: '#FFFFFF',
  pg: 'rgba(64, 118, 204, 0.2)',
  ph: 'rgba(64, 118, 204, 0.2)',
  pk: 'rgba(64, 118, 204, 0.2)',
  pl: 'rgba(137, 99, 49, 0.2)',
  pr: 'rgba(129, 129, 129, 0.2)',
  pt: 'rgba(137, 99, 49, 0.2)',
  py: 'rgba(129, 129, 129, 0.2)',
  qa: 'rgba(64, 118, 204, 0.2)',
  re: 'rgba(64, 118, 204, 0.2)',
  ro: 'rgba(137, 99, 49, 0.2)',
  rs: 'rgba(137, 99, 49, 0.2)',
  ru: 'rgba(137, 99, 49, 0.2)',
  rw: 'rgba(64, 118, 204, 0.2)',
  sa: 'rgba(64, 118, 204, 0.2)',
  sb: '#FFFFFF',
  sc: 'rgba(64, 118, 204, 0.2)',
  sd: 'rgba(64, 118, 204, 0.2)',
  se: 'rgba(137, 99, 49, 0.2)',
  sg: '#FFFFFF',
  si: 'rgba(137, 99, 49, 0.2)',
  sk: 'rgba(137, 99, 49, 0.2)',
  sl: 'rgba(64, 118, 204, 0.2)',
  sn: 'rgba(64, 118, 204, 0.2)',
  so: 'rgba(64, 118, 204, 0.2)',
  sr: 'rgba(129, 129, 129, 0.2)',
  st: 'rgba(64, 118, 204, 0.2)',
  sv: 'rgba(129, 129, 129, 0.2)',
  sy: 'rgba(64, 118, 204, 0.2)',
  sz: 'rgba(64, 118, 204, 0.2)',
  td: 'rgba(64, 118, 204, 0.2)',
  tg: 'rgba(64, 118, 204, 0.2)',
  th: 'rgba(64, 118, 204, 0.2)',
  tj: 'rgba(64, 118, 204, 0.2)',
  tl: '#FFFFFF',
  tm: 'rgba(64, 118, 204, 0.2)',
  tn: 'rgba(64, 118, 204, 0.2)',
  tr: 'rgba(137, 99, 49, 0.2)',
  tt: '#FFFFFF',
  tw: 'rgba(64, 118, 204, 0.2)',
  tz: 'rgba(64, 118, 204, 0.2)',
  ua: 'rgba(137, 99, 49, 0.2)',
  ug: 'rgba(64, 118, 204, 0.2)',
  us: 'rgba(123, 45, 153, 0.2)',
  uy: 'rgba(129, 129, 129, 0.2)',
  uz: 'rgba(64, 118, 204, 0.2)',
  ve: 'rgba(129, 129, 129, 0.2)',
  vn: 'rgba(64, 118, 204, 0.2)',
  vu: '#FFFFFF',
  ye: 'rgba(64, 118, 204, 0.2)',
  za: 'rgba(64, 118, 204, 0.2)',
  zm: 'rgba(64, 118, 204, 0.2)',
  zw: 'rgba(64, 118, 204, 0.2)'
};

const highlightRegionOfCountry = (cc) => {
  if (getRegion(cc)) {
    var region = getRegion(cc);
    var countries = region.countries;
    for (const countryIndex in countries) {
      $('#vmap').vectorMap('highlight', countries[countryIndex]);
    }
    $('#vmap').vectorMap('highlight', cc);
  }
};

const unhighlightRegionOfCountry = (cc) => {
  if (getRegion(cc)) {
    var region = getRegion(cc);
    var countries = region.countries;
    for (const countryIndex in countries) {
      $('#vmap').vectorMap('unhighlight', countries[countryIndex]);
    }
    $('#vmap').vectorMap('unhighlight', cc);
  }
};

const getRegionData = (region, regionalData) => {
  for (let k = 0; k < regionalData.length; k++) {
    if (regionalData[k]['region'] === region) {
      return regionalData[k];
    }
  }
};

const countryMap = {
  ar: 'LA',
  br: 'LA',
  cl: 'LA',
  co: 'LA',
  cr: 'LA',
  ec: 'LA',
  hn: 'LA',
  mx: 'LA',
  py: 'LA',
  pe: 'LA',
  uy: 'LA',
  // "pr": "LA",
  bo: 'LA',
  ni: 'LA',
  pa: 'LA',
  ve: 'LA',
  cu: 'LA',
  do: 'LA',
  gf: 'LA',
  sr: 'LA',
  gy: 'LA',
  gt: 'LA',
  fk: 'LA',
  sv: 'LA',

  au: 'AMEA',
  // "bh": "AMEA",
  cn: 'AMEA',
  eg: 'AMEA',
  gh: 'AMEA',
  in: 'AMEA',
  id: 'AMEA',
  jp: 'AMEA',
  my: 'AMEA',
  ma: 'AMEA',
  nz: 'AMEA',
  ng: 'AMEA',
  pk: 'AMEA',
  ph: 'AMEA',
  sa: 'AMEA',
  // "sg": "AMEA",
  za: 'AMEA',
  sz: 'AMEA',
  th: 'AMEA',
  dz: 'AMEA',
  ao: 'AMEA',
  bj: 'AMEA',
  bw: 'AMEA',
  bf: 'AMEA',
  bi: 'AMEA',
  cm: 'AMEA',
  cv: 'AMEA',
  cf: 'AMEA',
  td: 'AMEA',
  km: 'AMEA',
  cd: 'AMEA',
  cg: 'AMEA',
  ci: 'AMEA',
  dj: 'AMEA',
  // eg: 'AMEA',
  gq: 'AMEA',
  er: 'AMEA',
  et: 'AMEA',
  ga: 'AMEA',
  gm: 'AMEA',
  gw: 'AMEA',
  gn: 'AMEA',
  ke: 'AMEA',
  ls: 'AMEA',
  lr: 'AMEA',
  ly: 'AMEA',
  mg: 'AMEA',
  mw: 'AMEA',
  ml: 'AMEA',
  mr: 'AMEA',
  mu: 'AMEA',
  // "yt": "AMEA",
  // ma: 'AMEA',
  mz: 'AMEA',
  na: 'AMEA',
  ne: 'AMEA',
  re: 'AMEA',
  rw: 'AMEA',
  // "sh": "AMEA",
  st: 'AMEA',
  sn: 'AMEA',
  sc: 'AMEA',
  sl: 'AMEA',
  so: 'AMEA',
  // "ss": "AMEA",
  sd: 'AMEA',
  // sz: 'AMEA',
  tz: 'AMEA',
  tg: 'AMEA',
  tn: 'AMEA',
  ug: 'AMEA',
  // "eh": "AMEA",
  zm: 'AMEA',
  zw: 'AMEA',
  // "as": "AMEA",
  tm: 'AMEA',
  // "ym": "AMEA",
  om: 'AMEA',
  ir: 'AMEA',
  kr: 'AMEA',
  kp: 'AMEA',
  az: 'AMEA',
  tw: 'AMEA',
  pg: 'AMEA',
  ye: 'AMEA',
  lk: 'AMEA',
  af: 'AMEA',
  ae: 'AMEA',
  tj: 'AMEA',
  // "uj": "AMEA",
  kg: 'AMEA',
  mm: 'AMEA',
  la: 'AMEA',
  vn: 'AMEA',
  kh: 'AMEA',
  mv: 'AMEA',
  jo: 'AMEA',
  cy: 'AMEA',
  qa: 'AMEA',
  lb: 'AMEA',
  il: 'AMEA',
  sy: 'AMEA',
  iq: 'AMEA',
  kw: 'AMEA',
  uz: 'AMEA',
  np: 'AMEA',
  bd: 'AMEA',

  by: 'MEU',
  at: 'MEU',
  be: 'MEU',
  bg: 'MEU',
  cz: 'MEU',
  dk: 'MEU',
  fi: 'MEU',
  fr: 'MEU',
  ge: 'MEU',
  de: 'MEU',
  gr: 'MEU',
  hu: 'MEU',
  ie: 'MEU',
  it: 'MEU',
  kz: 'MEU',
  lt: 'MEU',
  nl: 'MEU',
  no: 'MEU',
  pl: 'MEU',
  pt: 'MEU',
  ro: 'MEU',
  rs: 'MEU',
  sk: 'MEU',
  si: 'MEU',
  es: 'MEU',
  se: 'MEU',
  ch: 'MEU',
  tr: 'MEU',
  ua: 'MEU',
  ru: 'MEU',
  gb: 'MEU',
  mn: 'MEU',
  is: 'MEU',
  al: 'MEU',
  mk: 'MEU',
  ba: 'MEU',
  hr: 'MEU',
  am: 'MEU',
  ee: 'MEU',

  ca: 'NA',
  us: 'NA',
  bs: 'NA',
  gl: 'NA'
};

const getCountriesInRegion = (cc) => {
  for (var regionKey in regionMap) {
    var countries = regionMap[regionKey].countries;
    for (var countryIndex in countries) {
      if (cc === countries[countryIndex]) {
        return countries;
      }
    }
  }
};

const getRegion = (cc) => {
  var regionCode = countryMap[cc];
  return regionMap[regionCode];
};

const mapMouseOver = (region) => {
  return `
    <div id="regionalscore">
        <div class="card-title-group align-start mb-2">
            <div class="card-title">
                <h5 class="title">${region['name']}</h5>
                <p><span class="d-none d-md-inline">Published on: </span>${region['data'].published}</p>
            </div>
        </div>
        <div class="progress-list gy-3">
            <div class="progress-wrap">
                <div class="progress-text">
                    <div class="progress-label">Score</div>
                    <div class="progress-amount">${region['data'].overall_score}%</div>
                </div>
                <div class="progress progress-md">
                    ${
                      region['data'].overall_score >= region['data'].passing_score
                        ? `<div class="progress-bar bg-success " data-progress=${region['data'].overall_score} style="width: ${region['data'].overall_score}%;"></div>`
                        : `<div class="progress-bar bg-danger " data-progress=${region['data'].overall_score} style="width: ${region['data'].overall_score}%;"></div>`
                    }
                </div>
            </div>
        </div>
        <div class="container" style="max-width: 270px;">
            <div class="nk-sale-data-group">
                <div class="row" style="padding-top: .5rem; padding-bottom: .5rem;">
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].overall_score} 
                                ${
                                  region['data'].overall_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].overall_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].overall_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].overall_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Global</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].overall_passing_score}% 
                                ${
                                  region['data'].overall_passing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].overall_passing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].overall_passing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].overall_passing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Passing</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].overall_failing_score}% 
                                ${
                                  region['data'].overall_failing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].overall_failing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].overall_failing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].overall_failing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Failing</span>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].firewall_score} 
                                ${
                                  region['data'].firewall_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].firewall_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].firewall_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].firewall_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Firewall</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].firewall_passing_score}% 
                                ${
                                  region['data'].firewall_passing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].firewall_passing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].firewall_passing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].firewall_passing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Passing</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].firewall_failing_score}% 
                                ${
                                  region['data'].firewall_failing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].firewall_failing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].firewall_failing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].firewall_failing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Failing</span>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].switch_score} 
                                ${
                                  region['data'].switch_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].switch_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].switch_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].switch_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Switch</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].switch_passing_score}% 
                                ${
                                  region['data'].switch_passing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].switch_passing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].switch_passing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].switch_passing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Passing</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].switch_failing_score}% 
                                ${
                                  region['data'].switch_failing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].switch_failing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].switch_failing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].switch_failing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Failing</span>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].wireless_score} 
                                ${
                                  region['data'].wireless_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].wireless_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].wireless_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].wireless_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Wireless</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].wireless_passing_score}% 
                                ${
                                  region['data'].wireless_passing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].wireless_passing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].wireless_passing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].wireless_passing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Passing</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="nk-sale-data">
                            <span class="amount" style="font-size: 1.1rem;">${region['data'].wireless_failing_score}% 
                                ${
                                  region['data'].wireless_failing_score_change < 0
                                    ? `<span class="change down text-danger"><em class="icon ni ni-arrow-long-down"></em>${Math.abs(
                                        region['data'].wireless_failing_score_change
                                      )}</span>`
                                    : ``
                                }
                                ${
                                  region['data'].wireless_failing_score_change > 0
                                    ? `<span class="change up text-success"><em class="icon ni ni-arrow-long-up"></em>${region['data'].wireless_failing_score_change}</span>`
                                    : ``
                                }
                            </span>
                            <span class="sub-title">Failing</span>
                        </div>
                    </div>
                </div>
            </div>	
        </div>
    </div>
    `;
};
