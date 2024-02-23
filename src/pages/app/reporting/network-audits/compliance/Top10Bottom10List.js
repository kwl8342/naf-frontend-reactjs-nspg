import React, { useCallback } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAppDispatch } from '../../../../../app/hooks';
import { setResultScoresModalData, showResultScoresModal } from '../../../../../features/scores/resultsScoresModal';

const Top10Bottom10List = ({
  sitesData,
  others = {
    label: String,
    passing_score: Number,
    published: String,
    disableViewAll: Boolean,
    disableRowOptions: Boolean
  },
  openModalFunction,
  isFullScreen,
  selectedReport
}) => {
  return (
    <div className="card card-bordered card-full top-bottom-container">
      <div className="card-inner-group">
        <div
          className={`${isFullScreen === true ? `card-inner-essw` : `card-inner`}`}
          id="top-bottom-parent"
          style={isFullScreen === true ? { borderBottom: '1px solid #e3d0f1' } : {}}
        >
          <div className="card-title-group" id="top-bottom-child">
            <div className="card-title">
              <h6 className="title">{others.label}</h6>
            </div>
            <div className="card-tools">
              <a
                href="#viewAll"
                className={`link ${others.disableViewAll ? 'disabled-link' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (!others?.disableViewAll) {
                    openModalFunction();
                  }
                }}
              >
                View All
              </a>
            </div>
          </div>
        </div>
        {sitesData.map((site, idx) => {
          return (
            <RegionalTopBottomScoreRow
              key={idx}
              siteData={site}
              passing_score={others?.passing_score}
              published={others?.published}
              isFullScreen={isFullScreen}
              disableOptions={others?.disableRowOptions}
              selectedReport={selectedReport}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Top10Bottom10List;

const getRegionBgClass = (region) => {
  let bg = '';

  if (region === 'AMEA') {
    bg = 'bg-amea';
  } else if (region === 'MEU') {
    bg = 'bg-meu';
  } else if (region === 'LA') {
    bg = 'bg-la';
  } else if (region === 'NA') {
    bg = 'bg-na';
  }
  return bg;
};

export const RegionalTopBottomScoreRow = ({
  siteData,
  passing_score,
  published,
  isFullScreen,
  disableOptions,
  ssid,
  selectedReport,
  hidePrevModal
}) => {
  const dispatch = useAppDispatch();

  const setScoresModalData = (data) => {
    dispatch(setResultScoresModalData(data));
  };

  const showScoresModal = useCallback(() => {
    return dispatch(showResultScoresModal());
  }, [dispatch]);

  return (
    <div
      className={`${isFullScreen === true ? 'card-inner-essw py-1' : 'card-inner card-inner-md'}`}
      style={isFullScreen === true ? { borderBottom: '1px solid #e3d0f1' } : {}}
    >
      <div className="user-card">
        <OverlayTrigger
          key={'left'}
          placement={'right'}
          delay={{ show: 500, hide: 0 }}
          overlay={
            <Tooltip arrow="true">
              <ul style={{ listStyle: 'none' }}>
                <li>Passing Score: {passing_score}</li>
                <li>Published on: {published}</li>
              </ul>
            </Tooltip>
          }
        >
          <div className={`user-avatar ${getRegionBgClass(siteData?.site__region?.toUpperCase())}`}>
            <span>{siteData.score}</span>
          </div>
        </OverlayTrigger>

        <div className="user-info">
          <span
            className="lead-text"
            style={{ cursor: 'pointer' }}
            data-ipamcode={siteData.site__ipam_code}
            data-ssid={ssid ? ssid : null}
            data-region={siteData.site__region}
            onClick={() => {
              if (hidePrevModal) {
                hidePrevModal();
              }
              setScoresModalData({
                ipam_code: siteData.site__ipam_code,
                region: siteData.site__region,
                report: selectedReport
              });
              showScoresModal();
            }}
          >
            {siteData.site__region} - {siteData.site__ipam_code}: {siteData.site__name}
          </span>
          {siteData.site__type === '' ? (
            <span className="sub-text">{siteData.site__country}</span>
          ) : (
            <span className="sub-text">
              {siteData.site__type}, {siteData.site__country}
            </span>
          )}
        </div>
        {disableOptions ? (
          ''
        ) : (
          <div className="user-action">
            <div className="drodown">
              <a href="#moreOptions" className="dropdown-toggle btn btn-icon btn-trigger mr-n1" data-toggle="dropdown" aria-expanded="false">
                <em className="icon ni ni-more-h"></em>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <ul className="link-list-opt no-bdr"></ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
