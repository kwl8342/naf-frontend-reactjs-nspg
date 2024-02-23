import React from 'react';
import MenuHeading from './MenuHeading';
import MenuOptions from './MenuOptions';

const Menu = ({ menuData, sidebarToggle, mobileView }) => {
  return (
    <ul className="nk-menu">
      {menuData.map((item, idx) => {
        return item.heading ? (
          <MenuHeading headingName={item.heading} key={idx} />
        ) : (
          <MenuOptions
            key={idx}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            newTab={item.newTab}
            badge={item.badge}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        );
      })}
    </ul>
  );
};

export default Menu;
