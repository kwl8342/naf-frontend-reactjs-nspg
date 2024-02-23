import React from "react";
import { Icon } from "../../../components/Component";
import Dropdown from 'react-bootstrap/Dropdown';

const $ = require('jquery');
$.dropdown = require('../../../../node_modules/bootstrap/js/src/dropdown');

const CommonFilterDropDown = ({ filterBodyId, filterFooterId }) => {
    const bodyId = filterBodyId ? filterBodyId : 'advanceFilterBody';
    const footerId = filterFooterId ? filterFooterId : 'advanceFilterFooter';

    return (
        <div className="dropdown">
            <a href="#filterDropdown" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-toggle="dropdown">
                <span><em className="d-sm-inline icon ni ni-filter-alt"></em><span className="d-none d-md-inline">Filtered By</span></span>
            </a>
            <div className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-select2">
                <div className="dropdown-head">
                    <span className="sub-title dropdown-title">Advance Filter</span>
                </div>
                <div className="dropdown-body dropdown-body-rg" id={bodyId}>

                </div>
                <div className="dropdown-foot between" id={footerId}>
                </div>
            </div>
        </div>
    )
}

const CustomToggle = React.forwardRef(({ children, className, id, onClick }, ref) => (
    <a
        href="#toggle"
        ref={ref}
        className={className}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

export const ReactCommonFilterDropDown = ({ filterBodyId, filterFooterId }) => {
    const bodyId = filterBodyId ? filterBodyId : 'advanceFilterBody';
    const footerId = filterFooterId ? filterFooterId : 'advanceFilterFooter';

    return (
        <Dropdown drop="start">
            <Dropdown.Toggle className="btn btn-white btn-dim btn-outline-light" as={CustomToggle}>
                <span><Icon className="d-sm-inline" name="filter-alt" /><span className="d-none d-md-inline">Filtered By</span></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-xl" flip="true" renderOnMount="true">
                <div className="dropdown-head">
                    <span className="sub-title dropdown-title">Advance Filter</span>
                </div>
                <div className="dropdown-body dropdown-body-rg" id={bodyId}>

                </div>
                <div className="dropdown-foot between" id={footerId}>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}


export default CommonFilterDropDown