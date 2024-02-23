import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ResultsModal from '../../../../components/mondelez/ResultsModal';
import RSelect2 from '../../../../components/mondelez/select/ReactSelect2';
import DatePicker from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';
import { capitalizeFirstLetter } from '../../../../components/mondelez/utils/datatables';
import { toastAlert } from '../../../../components/mondelez/utils/toast';
import moment from 'moment';

const ReportSettings = ({
  options = {
    title: String,
    modalId: String,
    inputIdExtension: String,
    enablePreviousReportSelector: Boolean,
    disablePredefinedRangeSelector: Boolean,
    disableDateRangeSelector: Boolean,
    disableSsidSelector: Boolean,
    enableFrequencySelector: Boolean,
    footerText: String,
    previousReportSelectorData: Array
  },
  isChartSettingsModalOpen,
  toggleChartSettings,
  selectedReport,
  setSelectedReport,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedFrequency,
  setSelectedFrequency,
  globalData
}) => {
  const frequencies = ['daily', 'weekly', 'monthly'];
  const ranges = useMemo(
    () => [
      {
        label: 'Last 30 Days',
        value: 30
      },
      {
        label: 'Last 90 Days',
        value: 90
      },
      {
        label: 'Last 6 Months',
        value: 180
      },
      {
        label: 'Last 1 Year',
        value: 365
      }
    ],
    []
  );

  const [localSelectedReport, setLocalSelectedReport] = useState(selectedReport);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localSelectedRange, setLocalSelectedRange] = useState(null);
  const [localSelectedFrequency, setLocalSelectedFrequency] = useState(selectedFrequency);

  // const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);

  const manageDateRange = useCallback(() => {
    const filteredRage = ranges.filter((r) => r.value === parseInt(localSelectedRange));
    if (filteredRage.length > 0) {
      const end = moment().format('YYYY-MM-DD');
      let start = moment(end).subtract(localSelectedRange, 'days').format('YYYY-MM-DD');

      if (parseInt(localSelectedRange) === 30) {
        start = moment(end).subtract(30, 'days').format('YYYY-MM-DD');
      } else if (parseInt(localSelectedRange) === 90) {
        start = moment(end).subtract(90, 'days').format('YYYY-MM-DD');
      } else if (parseInt(localSelectedRange) === 180) {
        start = moment(end).subtract(6, 'months').format('YYYY-MM-DD');
      } else if (parseInt(localSelectedRange) === 365) {
        start = moment(end).subtract(12, 'months').format('YYYY-MM-DD');
      }

      var endDateArray = end.split('-');
      var startDateArray = start.split('-');

      setLocalStartDate(new Date(startDateArray[0], parseInt(startDateArray[1], 10) - 1, startDateArray[2]));
      setLocalEndDate(new Date(endDateArray[0], parseInt(endDateArray[1], 10) - 1, endDateArray[2]));
    }
  }, [ranges, localSelectedRange, setLocalEndDate, setLocalStartDate]);

  const manageRangeRadios = useCallback(() => {
    var end = moment();
    if (end.diff(moment(localEndDate), 'days') === 0 && localStartDate) {
      var start = moment(localStartDate);
      var Difference_In_Days = end.diff(start, 'days');
      var Difference_In_Months = end.diff(start, 'months');

      if (Difference_In_Months === 6) {
        let s = moment(end).subtract(6, 'months').format('YYYY-MM-DD');
        if (start.diff(s, 'days') === 0) {
          Difference_In_Days = 180;
        }
      } else if (Difference_In_Months === 12) {
        let s = moment(end).subtract(12, 'months').format('YYYY-MM-DD');
        if (start.diff(s, 'days') === 0) {
          Difference_In_Days = 365;
        }
      }

      const filteredRage = ranges.filter((r) => r.value === Difference_In_Days);
      if (filteredRage.length > 0) {
        setLocalSelectedRange(filteredRage[0].value);
      } else {
        setLocalSelectedRange(null);
      }
    } else {
      setLocalSelectedRange(null);
    }
  }, [localEndDate, localStartDate, ranges]);

  const resetChartSettings = (e) => {
    e.preventDefault();

    setLocalSelectedReport(null);
    setSelectedReport(null);

    setLocalSelectedRange(null);

    setStartDate(null);
    setLocalStartDate(null);

    setEndDate(null);
    setLocalEndDate(null);

    setSelectedFrequency('monthly');
    setLocalSelectedFrequency('monthly');

    toastAlert('Chart Setting set to default.', 'Successful !');
    window.localStorage.removeItem('complianceChartSettings');
    setTimeout(() => {
      toggleChartSettings();
    }, 500);
  };

  const saveChartSettings = (e) => {
    e.preventDefault();

    setSelectedReport(localSelectedReport);
    setStartDate(localStartDate);
    setEndDate(localEndDate);
    setSelectedFrequency(localSelectedFrequency);

    window.localStorage.setItem(
      'complianceChartSettings',
      JSON.stringify({
        reportId: localSelectedReport,
        frequency: localSelectedFrequency,
        startDate: localStartDate,
        endDate: localEndDate
      })
    );
    toastAlert('Chart Setting updated.', 'Successful !');
    setTimeout(() => {
      toggleChartSettings();
    }, 500);
  };

  useEffect(() => {
    setLocalSelectedReport(selectedReport);
  }, [selectedReport]);

  useEffect(() => {
    manageDateRange();
  }, [localSelectedRange, manageDateRange]);

  useEffect(() => {
    manageRangeRadios();
  }, [manageRangeRadios]);

  return (
    <>
      {options ? (
        <ResultsModal
          useModalHeader={true}
          modalId={'modalComplianceChartSettings'}
          isOpen={isChartSettingsModalOpen}
          toggleModal={toggleChartSettings}
          modalTitle={options.title ? options.title : 'Report Settings'}
          bodyComponent={
            <>
              <form className="form-validate is-alter" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                {options.enablePreviousReportSelector === true && options.previousReportSelectorData.length > 0 ? (
                  <RSelect2
                    label={'Report'}
                    style={{ minWidth: '290px' }}
                    isClearable={true}
                    value={options.previousReportSelectorData.filter((obj) => obj.value === localSelectedReport)}
                    onChange={(e) => setLocalSelectedReport(e.value)}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    // menuPortalTarget={document.querySelector(this).parentElement().parentElement().parentElement()}
                    options={options.previousReportSelectorData}
                  ></RSelect2>
                ) : (
                  ``
                )}
                {options.enableFrequencySelector === true ? (
                  <div className="form-group">
                    <label className="overline-title overline-title-alt mb-2">Frequency</label>
                    <div
                      className="row predefined-frequency-radios"
                      // onChange={(e) => setLocalSelectedFrequency(e.target.dataset.frequency)}
                    >
                      {frequencies.map((freq, idx) => {
                        return (
                          <div className="col-3" key={idx}>
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id={freq}
                                name="frequency"
                                data-frequency={freq}
                                defaultChecked={freq === localSelectedFrequency}
                                onChange={() => setLocalSelectedFrequency(freq)}
                                className="custom-control-input form-control"
                                // checked={localSelectedFrequency}
                              />
                              <label className="custom-control-label" htmlFor={freq}>
                                {capitalizeFirstLetter(freq)}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {/* {options.disablePredefinedRangeSelector === true
                                        ? ''
                                        : <div className="form-group">
                                            <label className="form-label">Predefined Ranges</label>
                                            <div className="row predefined-range-radios">
                                                {
                                                    ranges.map((r, idx) => {
                                                        return (
                                                            <div className="col-3" key={idx}>
                                                                <div className="custom-control custom-radio">
                                                                    <input
                                                                        type="radio"
                                                                        id={r.label.replaceAll(' ', '-')}
                                                                        name="range"
                                                                        data-range={r.value}
                                                                        defaultChecked={localSelectedRange === r.value}
                                                                        className="custom-control-input form-control"
                                                                        onChange={() => setLocalSelectedRange(r.value)}
                                                                    />
                                                                    <label className="custom-control-label" htmlFor={r.label.replaceAll(' ', '-')}>
                                                                        {r.label}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    } */}
                {options.disablePredefinedRangeSelector === true ? (
                  ''
                ) : (
                  <RSelect2
                    label={'Predefined Range'}
                    style={{ minWidth: '290px' }}
                    isClearable={true}
                    value={ranges.filter((obj) => obj.value === localSelectedRange)}
                    onChange={(e) => setLocalSelectedRange(e.value)}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    // menuPortalTarget={document.querySelector(this).parentElement().parentElement().parentElement()}
                    options={ranges}
                  ></RSelect2>
                )}
                {options.disableDateRangeSelector === true ? (
                  ''
                ) : (
                  <FormGroup>
                    <Label className="overline-title overline-title-alt mb-2">Date Range</Label>
                    <div className="form-control-wrap">
                      <div className="input-daterange date-picker-range input-group">
                        <DatePicker
                          selected={localStartDate}
                          onChange={(date) => {
                            setLocalStartDate(date);
                            manageRangeRadios();
                          }}
                          selectsStart
                          startDate={localStartDate}
                          endDate={localEndDate}
                          wrapperClassName="start-m"
                          className="form-control"
                          placeholderText="Start Date (mm/dd/yyyy)"
                          popperPlacement="bottom-start"
                          maxDate={new Date()}
                          isClearable
                        />
                        <div className="input-group-addon">TO</div>
                        <DatePicker
                          selected={localEndDate}
                          onChange={(date) => {
                            setLocalEndDate(date);
                            manageRangeRadios();
                          }}
                          startDate={localStartDate}
                          endDate={localEndDate}
                          selectsEnd
                          minDate={localStartDate}
                          wrapperClassName="end-m"
                          className="form-control"
                          placeholderText="End date (mm/dd/yyyy)"
                          popperPlacement="bottom-end"
                          maxDate={new Date()}
                          isClearable
                        />
                      </div>
                    </div>
                  </FormGroup>
                )}
                {options.disableSsidSelector === true ? (
                  ''
                ) : (
                  <div className="form-group">
                    <label className="form-label">Wireless SSID:</label>
                    <div className="form-control-wrap"></div>
                  </div>
                )}
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary"
                    id="updateReportSettings"
                    onClick={saveChartSettings}
                    // disabled={disableUpdateBtn}
                  >
                    Update
                  </button>
                  <button className="btn btn-lg btn-light" id="resetReportSettings" onClick={resetChartSettings}>
                    Reset
                  </button>
                </div>
              </form>
            </>
          }
          modalFooter={options.footerText ? options.footerText : 'Wireless Report Settings'}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ReportSettings;
