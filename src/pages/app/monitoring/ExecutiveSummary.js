import React from 'react';
import Content from '../../../layout/content/Content';
import Head from '../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, BlockBetween } from '../../../components/Component';

const ExecutiveSummary = () => {
  return (
    <React.Fragment>
      <Head title="Executive Summary"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Executive Summary
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Executive Summary Dashboard</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>
      </Content>
    </React.Fragment>
  );
};

export default ExecutiveSummary;
