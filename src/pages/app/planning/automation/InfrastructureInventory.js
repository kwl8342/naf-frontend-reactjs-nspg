import React from 'react';
import Content from '../../../../layout/content/Content';
import Head from '../../../../layout/head/Head';
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, BlockBetween } from '../../../../components/Component';

const InfrastructureInventory = () => {
  return (
    <React.Fragment>
      <Head title="Infrastructure Inventory"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Infrastructure Inventory
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Infrastructure Inventory Details</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>
      </Content>
    </React.Fragment>
  );
};

export default InfrastructureInventory;
