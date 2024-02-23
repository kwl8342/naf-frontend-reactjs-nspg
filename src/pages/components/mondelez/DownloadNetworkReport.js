import  {Dropdown} from "react-bootstrap";
import React, {useRef, useEffect, useState} from "react"
import { Icon } from "../../../components/Component";
import config from "../../../config";
import { getMsToken, secureAxios } from "../../../utils/nspgApi";
import { getFilterData } from "./CommonDataTableFilters";
import RSelect2 from "./select/ReactSelect2";
import { toastAlert } from '../../../pages/components/mondelez/utils/toast'

const $ = require('jquery');
$.select2 = require('../../../../node_modules/select2/dist/js/select2.min.js')

const createDropdownOptions = (valueList) => {
    let options = [{ value: '', label: 'All' }]

    valueList.forEach(value => {
        options.push({ value: value, label: value })
    });

    return options
}

const downloadComplianceReport = async (microService, baseExportUrl, selectedReport, selectedReportType, selectedRegion, selectedIpamCode) => {

    const url = `${config.services.arms.uri}${baseExportUrl}?${selectedReport !== '' ? `report=${selectedReport}` : ''}${
        selectedReportType !== '' ? `&type=${selectedReportType}` : ''
    }${selectedRegion !== '' ? `&region=${selectedRegion}` : ''}${selectedIpamCode !== '' ? `&ipam=${selectedIpamCode}` : ''}`;

    let fileNameExt = '';

    if (selectedReportType === '' && selectedRegion === '' && selectedIpamCode === '') {
        fileNameExt = `Full-Report_${selectedReport}`;
    } else if (selectedReportType !== '' && selectedRegion === '' && selectedIpamCode === '') {
        fileNameExt = `Report-${selectedReport}-${selectedReportType}-${selectedRegion}-${selectedIpamCode}`;
    } else if (selectedReportType === '' && selectedRegion !== '' && selectedIpamCode === '') {
        fileNameExt = `Report-${selectedReport}-${selectedRegion}`;
    } else if (selectedReportType === '' && selectedRegion === '' && selectedIpamCode !== '') {
        fileNameExt = `Report-${selectedReport}-${selectedIpamCode}`;
    } else if (selectedReportType !== '' && selectedRegion !== '' && selectedIpamCode === '') {
        fileNameExt = `Report-${selectedReport}-${selectedReportType}-${selectedRegion}`;
    } else if (selectedReportType !== '' && selectedRegion === '' && selectedIpamCode !== '') {
        fileNameExt = `Report-${selectedReport}-${selectedReportType}-${selectedIpamCode}`;
    } else if (selectedReportType !== '' && selectedRegion !== '' && selectedIpamCode !== '') {
        fileNameExt = `Report-${selectedReport}-${selectedReportType}-${selectedRegion}-${selectedIpamCode}`;
    }else {
        fileNameExt = `Report-${selectedReport}`;
    }
    
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${await getMsToken(microService)}`);

    fetch(url, { headers })
        .then((response) => response.blob())
        .then((blobby) => {
            let objectUrl = window.URL.createObjectURL(blobby);
        
            let anchor = document.createElement('a');
            anchor.href = objectUrl;
            anchor.download = `Network_Audits_Compliance_${fileNameExt}.zip`;
            anchor.click();

            window.URL.revokeObjectURL(objectUrl);
        });
    
    toastAlert('Downloading started in background. Please wait for a moment before re-download', 'Downloading Started !');
    
};

const DownloadNetworkReport = ({
    microService='ARMS',
    msFilterDataUrl,
    baseExportUrl,
    selectedReportId,
    selectedReportPublished,
}) => {
    const dropdownRef = useRef()

    const [isShown, setIsShown] = useState(false);

    const reportTypes = ['Devices', 'Infrastructure', 'Sites', 'Scores']
    const [loading, setLoading] = useState(true);
    const [dropdownData, setDropdownData] = useState();
    const [prevReportsOptions, setPrevReportsOptions] = useState([{id: selectedReportId, published: selectedReportPublished}]);

    const [disableRegionSelect, setDisableRegionSelect] = useState(false);
    const [disableIpamSelect, setDisableIpamSelect] = useState(false);

    const [selectedReport, setSelectedReport] = useState(selectedReportId);
    const [selectedReportType, setSelectedReportType] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedIpamCode, setSelectedIpamCode] = useState('');

    
    useEffect(() => {
        const initDownloadReport = async () => {
            setDropdownData((await getFilterData(microService, msFilterDataUrl, true)).data)
            
            const res = (await secureAxios({
                method: 'GET',
                url: `${config.services.arms.uri}/core/previous-reports`
            }, microService)).data.report

            let opts = []
            res.forEach(report => {
                opts.push({value: report.id, label: report.published})
            })
            setPrevReportsOptions(opts)
            
            setLoading(false)
        }
            
        initDownloadReport()
    }, [microService, msFilterDataUrl]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef])


    const handleChange = (e, selectOptionSetter) => {
        selectOptionSetter(e.value)

        if (selectOptionSetter === setSelectedRegion && e.value !== '') {
            setDisableIpamSelect(true)
        } else if (selectOptionSetter === setSelectedRegion && e.value === ''){
            setDisableIpamSelect(false)
        }
        
        if (selectOptionSetter === setSelectedIpamCode && e.value !== '') {
            setDisableRegionSelect(true)
        } else if (selectOptionSetter === setSelectedIpamCode && e.value === '') {
            setDisableRegionSelect(false)
        }
    }

    const handleDownload = () => {
        downloadComplianceReport(microService, baseExportUrl, selectedReport, selectedReportType, selectedRegion, selectedIpamCode)
    }

    return (
        <Dropdown direction="left" autoClose="outside" show={isShown} ref={dropdownRef}>
            <Dropdown.Toggle id="dropdown-autoclose-false" className="btn-action btn btn-dim btn-outline-primary d-sm-inline-flex" onClick = {() => setIsShown(!isShown)}>
                <span><Icon className="d-sm-inline" name="download-cloud"/><span><span className="d-none d-md-inline">Download</span> Report</span></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-xl" >
                <div className="dropdown-head">
                    <span className="sub-title dropdown-title">Download Report Options</span>
                </div>
                <div className="dropdown-body dropdown-body-md">
                    <div className="row gx-6 gy-4">
                        <div className="col-6">
                            <RSelect2
                                label={"Report"}
                                value={prevReportsOptions.filter(obj => obj.value === selectedReport)}
                                onChange={(e) => handleChange(e, setSelectedReport)}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                options={prevReportsOptions}
                            />
                        </div>
                        <div className="col-6">
                            <RSelect2
                                label="Report Type"
                                placeholder="All"
                                isClearable={true}
                                value={createDropdownOptions(reportTypes).filter(obj => obj.value === selectedReportType)}
                                onChange={(e) => handleChange(e, setSelectedReportType)}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                menuPortalTarget={document.body}
                                options={createDropdownOptions(reportTypes)}
                            />
                        </div>
                        {
                            !loading && dropdownData ?
                            (<div className="col-6 pt-3">
                                <RSelect2
                                    label="Region"
                                    placeholder="All"
                                    isClearable={true}
                                    isDisabled={disableRegionSelect}
                                    value={createDropdownOptions(dropdownData.region).filter(obj => obj.value === selectedRegion)}
                                    onChange={(e) => handleChange(e, setSelectedRegion)}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    menuPortalTarget={document.body}
                                    options={createDropdownOptions(dropdownData.region)}
                                />
                            </div>)
                                : ''
                        }
                        {
                            !loading && dropdownData ?
                                (<div className="col-6 pt-3">
                                    <RSelect2
                                        label="Ipam Code"
                                        placeholder="All"
                                        isClearable={true}
                                        isDisabled={disableIpamSelect}
                                        value={createDropdownOptions(dropdownData.ipam_code).filter(obj => obj.value === selectedIpamCode)}
                                        onChange={(e) => handleChange(e, setSelectedIpamCode)}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPortalTarget={document.body}
                                        options={createDropdownOptions(dropdownData.ipam_code)}
                                    />
                                </div>)
                                : ''
                        }
                    </div>
                </div>
                <div className="dropdown-foot between">
                {
                    !loading ?
                        (
                            // eslint-disable-next-line
                            <a onClick={handleDownload} style={{cursor: 'pointer', color: 'orange'}}>Download</a>
                        )
                        :
                        ''
                }
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default DownloadNetworkReport;
