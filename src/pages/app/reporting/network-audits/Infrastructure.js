import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Row, BlockBetween } from '../../../../components/Component';

const Infrastructure = () => {
  return (
    <React.Fragment>
      <Head title="Infrastructure"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Infrastructure
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Infrastructure LAN and WLAN Details</p>
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

export default Infrastructure;
