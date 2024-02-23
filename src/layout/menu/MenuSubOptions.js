import React from 'react';
import MenuOptions from './MenuOptions';

const MenuSubOptions = ({ icon, link, text, sub, sidebarToggle, mobileView, ...props }) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuOptions
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          badge={item.badge}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

export default MenuSubOptions;
