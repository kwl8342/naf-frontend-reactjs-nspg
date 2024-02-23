import React from 'react';

const MenuHeading = ({ headingName }) => {
  return (
    <li className="nk-menu-heading">
      <h6 className="overline-title text-primary-alt">{headingName}</h6>
    </li>
  );
};

export default MenuHeading;
