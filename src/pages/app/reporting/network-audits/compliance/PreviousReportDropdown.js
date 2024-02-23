import React, { useState } from 'react';

// import Icon from "../../components/icon/Icon";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Icon } from '../../../../../components/Component';

const PreviousReportDropdown = ({ previousReportSelectorData, selectedReport, setSelectedReport }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="btn-action btn-dim btn-outline-light" color="white">
        <Icon name="calender-date"></Icon>
        <span>
          <span className="d-none d-md-inline">Previous</span> Reports
        </span>
        <Icon name="chevron-right"></Icon>
      </DropdownToggle>
      <DropdownMenu right={true}>
        <ul className="link-list-opt">
          {previousReportSelectorData.length > 0
            ? previousReportSelectorData.map((report, idx) => {
                return (
                  <li key={idx} className={`${report.value === selectedReport ? 'active' : ''}`}>
                    <DropdownItem
                      tag="a"
                      href="#links"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedReport(report.value);
                      }}
                    >
                      <span>{report.label}</span>
                    </DropdownItem>
                  </li>
                );
              })
            : ''}
        </ul>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PreviousReportDropdown;
