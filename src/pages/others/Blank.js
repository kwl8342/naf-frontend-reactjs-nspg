import React from 'react';
import Content from '../../layout/content/Content';
import Head from '../../layout/head/Head';

const BlankPage = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Blank Page" />
      <Content>
        <h1>Hello World!</h1>
        <p>Starter Page for general layout</p>
      </Content>
    </React.Fragment>
  );
};

export default BlankPage;
