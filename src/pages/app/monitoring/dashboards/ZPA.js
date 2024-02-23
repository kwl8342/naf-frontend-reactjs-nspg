import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, BlockBetween } from '../../../../components/Component';

const ZPA = () => {
  return (
    <React.Fragment>
      <Head title="Humio ZPA"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Humio ZPA
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>ZPA Network Operations Dashboard</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>
      </Content>
    </React.Fragment>
  );
};

export default ZPA;
