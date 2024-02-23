import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ ...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + ' | ' : null} Network Portal, Single Pane of Glass.</title>
    </Helmet>
  );
};
export default Head;
