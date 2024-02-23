import { useState, useEffect } from 'react';
import DoughnutChartWithCustomCenterText from '../../../../components/mondelez/chart/DoughnutChartWithCustomCenterText';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const manageRegionCards = () => {
  let regionalScoreCards = document.querySelectorAll('.regionalscore');

  if (document.fullscreenElement && document.fullscreenElement.id === 'naf-main-container') {
    let fsContainer = document.querySelector('#naf-main-container');
    let fsRegionalScoreCards = fsContainer.querySelectorAll('.regionalscore');
    fsRegionalScoreCards.forEach((block) => {
      block.classList.remove('col-lg-6');
      block.classList.add('col-lg-3');
      block.querySelectorAll('canvas').forEach((canvas) => {
        canvas.style.maxHeight = '105px';
      });
    });
  } else {
    if (window.innerWidth > 2050) {
      regionalScoreCards.forEach((block) => {
        block.classList.add('col-xxl-3');
        block.querySelectorAll('canvas').forEach((canvas) => {
          canvas.style.maxHeight = '105px';
        });
      });
    } else {
      regionalScoreCards.forEach((block) => {
        block.classList.remove('col-xxl-3');
        block.querySelectorAll('canvas').forEach((canvas) => {
          canvas.style.maxHeight = '155px';
        });
      });
    }
  }
};

const RegionalWidgets = ({ data }) => {
  const [overallChartData, setOverallChartData] = useState(null);
  const [firewallChartData, setFirewallChartData] = useState(null);
  const [switchChartData, setSwitchChartData] = useState(null);
  const [wirelessChartData, setWirelessChartData] = useState(null);

  useEffect(() => {
    setOverallChartData({
      labels: ['Passing', 'Falling'],
      dataUnit: '%',
      legend: false,
      datasets: [
        {
          borderColor: '#fff',
          background: ['#73a769', '#c97b7b'],
          data: [data.overall_passing_score, data.overall_failing_score],
          centerText: parseFloat(data.overall_score).toFixed(2)
        }
      ]
    });

    setFirewallChartData({
      labels: ['Passing', 'Falling'],
      dataUnit: '%',
      legend: false,
      datasets: [
        {
          borderColor: '#fff',
          background: ['#73a769', '#c97b7b'],
          data: [data.firewall_passing_score, data.firewall_failing_score],
          centerText: parseFloat(data.firewall_score).toFixed(2)
        }
      ]
    });
    setSwitchChartData({
      labels: ['Passing', 'Falling'],
      dataUnit: '%',
      legend: false,
      datasets: [
        {
          borderColor: '#fff',
          background: ['#73a769', '#c97b7b'],
          data: [data.switch_passing_score, data.switch_failing_score],
          centerText: parseFloat(data.switch_score).toFixed(2)
        }
      ]
    });
    setWirelessChartData({
      labels: ['Passing', 'Falling'],
      dataUnit: '%',
      legend: false,
      datasets: [
        {
          borderColor: '#fff',
          background: ['#73a769', '#c97b7b'],
          data: [data.wireless_passing_score, data.wireless_failing_score],
          centerText: parseFloat(data.wireless_score).toFixed(2)
        }
      ]
    });
  }, [data]);

  return (
    <div className="card card-bordered" data-region={data.region}>
      <div className="card-inner">
        <div className="card-title-group align-start mb-2">
          <div className="card-title">
            <h5 className="title">{data.region}</h5>
            <p>
              <span className="d-none d-md-inline">Published: </span>
              {data.published}
            </p>
          </div>
          <div className="card-tools">
            <OverlayTrigger
              key={'left'}
              placement={'left'}
              delay={{ show: 250, hide: 0 }}
              overlay={
                <Tooltip arrow={true}>
                  <ul style={{ listStyle: 'none' }}>
                    <li>Passing Score: {data.passing_score}</li>
                    <li>Published on: {data.published}</li>
                  </ul>
                </Tooltip>
              }
            >
              <em className="card-hint icon ni ni-help-fill"></em>
            </OverlayTrigger>
          </div>
        </div>
        <div className="row pt-1">
          <div className="col-3 px-1 m-auto text-center">
            {overallChartData ? <DoughnutChartWithCustomCenterText data={overallChartData} style={{ maxHeight: '155px' }} /> : ''}
            <span className="regional-score-sub-title">Overall</span>
          </div>
          <div className="col-3 px-1 m-auto text-center">
            {firewallChartData ? <DoughnutChartWithCustomCenterText data={firewallChartData} style={{ maxHeight: '155px' }} /> : ''}
            <span className="regional-score-sub-title">Firewall</span>
          </div>
          <div className="col-3 px-1 m-auto text-center">
            {switchChartData ? <DoughnutChartWithCustomCenterText data={switchChartData} style={{ maxHeight: '155px' }} /> : ''}
            <span className="regional-score-sub-title">Switch</span>
          </div>
          <div className="col-3 px-1 m-auto text-center">
            {wirelessChartData ? <DoughnutChartWithCustomCenterText data={wirelessChartData} style={{ maxHeight: '155px' }} /> : ''}
            <span className="regional-score-sub-title">Wireless</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalWidgets;
