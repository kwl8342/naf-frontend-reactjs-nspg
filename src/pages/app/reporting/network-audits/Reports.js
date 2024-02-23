import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Row, BlockBetween } from '../../../../components/Component';

const Reports = () => {
  return (
    <React.Fragment>
      <Head title="Reports"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Reports
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Details about Network Audits imports</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs"></Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Reports;
