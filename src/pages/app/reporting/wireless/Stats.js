import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Row, BlockBetween } from '../../../../components/Component';

const Stats = () => {
  return (
    <React.Fragment>
      <Head title="Stats"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Stats
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Site score is calculated based on SSID Score</p>
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

export default Stats;
