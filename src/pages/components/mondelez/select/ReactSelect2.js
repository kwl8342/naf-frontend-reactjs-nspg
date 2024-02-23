import React from "react";
import Select from "react-select";

const RSelect2 = ({ label, ...props }) => {
  return (
    <div className="form-group">
      {label  ? <label className="overline-title overline-title-alt mb-2">{label}</label> : ''}
      <div className="form-control-select">
        <Select
          className={`react-select-container ${props.className ? props.className : ""}`}
          classNamePrefix="react-select"
          {...props}
        />
      </div>
    </div>
  );
};

export default RSelect2;
