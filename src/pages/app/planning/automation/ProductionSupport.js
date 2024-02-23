import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, BlockBetween } from '../../../../components/Component';

const ProductionSupport = () => {
  return (
    <React.Fragment>
      <Head title="Production Support"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Production Support
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Production Support Details</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>
      </Content>
    </React.Fragment>
  );
};

export default ProductionSupport;
