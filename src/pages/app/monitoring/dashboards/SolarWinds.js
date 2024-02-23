import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, BlockBetween } from '../../../../components/Component';

const SolarWinds = () => {
  return (
    <React.Fragment>
      <Head title="SolarWinds"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                SolarWinds
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>SolarWinds Network Operations Dashboard</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>
      </Content>
    </React.Fragment>
  );
};

export default SolarWinds;
